import {RuleType, INestedGroupClass, NestedGroup} from "./RuleTypes"
import {RuleContainer} from "./RuleContainer"
import {IRuleContainerOwner} from "./Rule"



/**
 * The GroupRule class serves as a base class for all grouping CSS rules.
 */
export abstract class GroupRule<T extends NestedGroup<O>, O extends {}> extends RuleContainer<T>
{
	public constructor( type: RuleType, definitionClass: INestedGroupClass<T,O>)
	{
		super( type);
		this.definitionClass = definitionClass;
	}



	// Processes the given rule.
	public process( owner: IRuleContainerOwner, ruleName: string)
	{
		super.process( owner, ruleName);

		// process sub-rules
		this.processRules();
	}



	// Returns an instance of the definition class or null if failure
	protected createDefinitionInstance(): T | null
	{
		try
		{
			return new this.definitionClass( this.owner.getDefinitionInstance() as O);
		}
		catch( err)
		{
			console.error( `Error instantiating Group Rule Definition Class '${this.definitionClass.name}'`, err);
			return null;
		}
	}



	// Inserts this rule into the given parent rule or stylesheet.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void
	{
		this.cssRule = this.insertGroupingRule( parent);

		// insert sub-rules
		if (this.cssRule)
			this.insertRules( this.cssRule as CSSGroupingRule);
	}



	// Inserts this rule into the given parent rule or stylesheet.
	protected abstract insertGroupingRule( parent: CSSStyleSheet | CSSGroupingRule): CSSRule;



	// Clers the CSS rule object.
	public clear(): void
	{
		super.clear();

		// clear sub-rules
		this.clearRules();
	}



	// Class that defined this stylesheet.
	protected definitionClass: INestedGroupClass<T,O>;
}



