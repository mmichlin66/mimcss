import * as cssts from "./cssts"



/**
 * The RuleWithStyle class is used as a base class for rules that have a single style rule.
 */
export abstract class Rule implements cssts.IRule
{
	public constructor( owner: cssts.StyleSheetDefinition)
	{
		this.owner = owner;
	}

	// Style sheet definition to which this rule belongs.
	public owner: cssts.StyleSheetDefinition;

	// Processes the given rule.
	public abstract process( styleSheetName: string, ruleName: string);
}



/**
 * The RuleWithStyle class is used as a base class for rules that have a single style rule.
 */
export class StyleRule extends Rule implements cssts.IStyleRule
{
	public constructor( owner: cssts.StyleSheetDefinition, ruleset: cssts.ExtendedRuleset, parents: cssts.IStyleRule[])
	{
		super( owner);

		this.ruleset = {};
		this.parents = parents || [];
		this.important = new Set<string>();

		this.parseExtendedRuleset( ruleset);
	}

	private parseExtendedRuleset( ruleset: cssts.ExtendedRuleset): void
	{
		if (ruleset instanceof StyleRule)
		{
			// ruleset is a single IStyleRule object, which we add as our parent
			this.parents.push( ruleset);
		}
		else if (Array.isArray(ruleset))
		{
			// ruleset is an array of IStyleRule objects, which we add as our parents
			for( let rule of ruleset)
				this.parents.push( rule);
		}
		else
		{
			// ruleset is a set of style properties but can also include the $inherits and
			// $important properties
			for( let propName in ruleset)
			{
				let propVal = ruleset[propName];
				if (propName === "$inherits")
				{
					let inheritsPropVal = propVal as (cssts.IStyleRule | cssts.IStyleRule[]);
					if (Array.isArray(inheritsPropVal))
					{
						// this is is an array of IStyleRule objects, which we add as our parents
						for( let rule of inheritsPropVal)
							this.parents.push( rule);
					}
					else
					{
						// this is a single IStyleRule object, which we add as our parent
						this.parents.push( inheritsPropVal);
					}
				}
				else if (propName === "$important")
				{
					let importantPropVal = propVal as (string | string[]);
					if (Array.isArray(importantPropVal))
					{
						// this is is an array of strings
						for( let important of importantPropVal)
							this.important.add( important);
					}
					else
					{
						// this is a single string
						this.important.add( importantPropVal);
					}
				}
				else
				{
					// copy the property value to our internal ruleset
					this.ruleset[propName] = propVal;
				}
			}
		}
	}


	// Processes the given rule.
	public process( styleSheetName: string, ruleName: string)
	{
		// go through all parents and if the parent belongs to a different style sheet
		// definition, make sure it is processed. We don't worry about circular dependencies
		// because the parent's owner cannot be our sheet definition if the parent doesn't belong
		// to our sheet.
		for( let parent of this.parents)
		{
			if (parent.owner !== this.owner)
				parent.owner.process();
		}
	}

	// Style rule defining style properties.
	public ruleset: cssts.Ruleset;

	// Style rule defining style properties.
	public parents: cssts.IStyleRule[];

	// Set of property names from this ruleset that should be !important.
	important: Set<string>;
}



/**
 * The TagRule type describes a ruleset that applies to elements identified by a tag name.
 */
export class TagRule extends StyleRule implements cssts.ITagRule
{
	public constructor( owner: cssts.StyleSheetDefinition, ruleset: cssts.ExtendedRuleset, parents: cssts.IStyleRule[])
	{
		super( owner, ruleset, parents);
	}

	// Name of the class under which the ruleset will appear in the style sheet.
	public tagName: string;

	// Processes the given rule.
	public process( styleSheetName: string, ruleName: string)
	{
		super.process( styleSheetName, ruleName);

		this.tagName = ruleName;

		// go through all parents; for those who are classes, add their name to the
		// combined name. For those who are not classes, copy style properties to the
		// class's own ruleset.
		for( let parent of this.parents)
			Object.assign( this.ruleset, parent.ruleset);
	}

	// Creates string representation of the 
	public toString(): string
	{
		return `${this.tagName} ${cssts.rulesetToString( this.ruleset, this.important)}`;
	}
}



/**
 * The ClassRule type describes a ruleset that applies to elements identified by a class.
 */
export class ClassRule extends StyleRule implements cssts.IClassRule
{
	public constructor( owner: cssts.StyleSheetDefinition, ruleset: cssts.ExtendedRuleset, parents: cssts.IStyleRule[])
	{
		super( owner, ruleset, parents);
	}

	// Name of the class under which the ruleset will appear in the style sheet.
	public properName: string;

	// Name that combines the proper name of this class and the proper names of all classes this
	// class inherits from.
	public combinedName: string;

	// Processes the given rule.
	public process( styleSheetName: string, ruleName: string)
	{
		super.process( styleSheetName, ruleName);

		this.properName = cssts.generateName( styleSheetName, ruleName);
		this.combinedName = this.properName;

		// go through all parents; for those who are classes, add their names to the combined name.
		// For those who are not classes, copy their style properties to our own ruleset.
		for( let parent of this.parents)
		{
			if (parent instanceof ClassRule)
				this.combinedName += " " + parent.combinedName;
			else
				Object.assign( this.ruleset, parent.ruleset);
		}
	}

	// Creates string representation of the 
	public toString(): string
	{
		return `.${this.properName} ${cssts.rulesetToString( this.ruleset, this.important)}`;
	}
}



/** Returns new ClassRule object as belonging to the given style sheet definition  */
export function defineTag( ssDef: cssts.StyleSheetDefinition, ruleset: cssts.ExtendedRuleset,
				parents: cssts.IStyleRule[]): cssts.ITagRule
{
	return new TagRule( ssDef, ruleset, parents);
}



/** Returns new ClassRule object as belonging to the given style sheet definition  */
export function defineClass( ssDef: cssts.StyleSheetDefinition, ruleset: cssts.ExtendedRuleset,
				parents: cssts.IStyleRule[]): cssts.IClassRule
{
	return new ClassRule( ssDef, ruleset, parents);
}



/** Returns new IDRule object as belonging to the given style sheet definition  */
export function defineID( ssDef: cssts.StyleSheetDefinition, ruleset: cssts.ExtendedRuleset,
				parents: cssts.IStyleRule[]): cssts.IIDRule
{
	return {} as cssts.IIDRule;
}



/** Returns new AnimationRule object as belonging to the given style sheet definition  */
export function defineAnimation( ssDef: cssts.StyleSheetDefinition,
				keyframes: cssts.Keyframe[]): cssts.IAnimationRule
{
	return {} as cssts.IAnimationRule;
}



