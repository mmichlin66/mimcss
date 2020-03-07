import {NamesOfPropsOfType, PropsOfType, IRule, IStyleRule, ITagRule, IClassRule, IIDRule,
		ISelectorRule, IAnimationRule, ICustomVar, IRuleDefinitionClass, IGroupRule}
		from "../api/rules"
import {RuleContainer, IRuleContainerOwner} from "./RuleContainer"



/**
 * The GroupRule class represents a parsed form of a StyleSheetDefinition-derived class. This
 * class doesn't have a template parameter, but it conforms to the IStyleSheet<T> interface,
 * which provides names of classes, IDs and keyframes defined in the class T, which must be
 * derived from the StyleSheetDefinition class.
 */
export abstract class GroupRule<T = any> extends RuleContainer<T> implements IGroupRule<T>
{
	public constructor( definitionClass: IRuleDefinitionClass<T>)
	{
		super( definitionClass);
	}



	/** Names of classes defined in the style sheet */
	public get classNames(): NamesOfPropsOfType<T,IClassRule> { return this._classNames as NamesOfPropsOfType<T,IClassRule> }

	/** Names of classes defined in the style sheet */
	public get idNames(): NamesOfPropsOfType<T,IIDRule> { return this._idNames as NamesOfPropsOfType<T,IIDRule>; }

	/** Names of keyframes defined in the style sheet */
	public get animationNames(): NamesOfPropsOfType<T,IAnimationRule> { return this._animationNames as NamesOfPropsOfType<T,IAnimationRule>; }

	/** Names of custom CSS properties defined in the style scope */
	public get varNames(): NamesOfPropsOfType<T,ICustomVar> { return this._varNames as NamesOfPropsOfType<T,ICustomVar>; }

	/** Map of all style (tag, class, ID and selector) rules. */
	public get styleRules(): PropsOfType<T,IStyleRule> { return this._styleRules as PropsOfType<T,IStyleRule>; }

	/** Map of all tag rules. */
	public get tagRules(): PropsOfType<T,ITagRule> { return this._tagRules as PropsOfType<T,ITagRule>; }

	/** Map of all class rules. */
	public get classRules(): PropsOfType<T,IClassRule> { return this._classRules as PropsOfType<T,IClassRule>; }

	/** Map of all ID rules. */
	public get idRules(): PropsOfType<T,IIDRule> { return this._idRules as PropsOfType<T,IIDRule>; }

	/** Map of all selector rules. */
	public get selectorRules(): PropsOfType<T,ISelectorRule> { return this._selectorRules as PropsOfType<T,ISelectorRule>; }

	/** Map of all animation rules. */
	public get animationRules(): PropsOfType<T,IAnimationRule> { return this._animationRules as PropsOfType<T,IAnimationRule>; }

 	/** The ":root" block with CSS custom property definitions. */
	public get varRules(): PropsOfType<T,ICustomVar> { return this._varRules as PropsOfType<T,ICustomVar>; }

	/** Map of all rules. */
	public get namedRules(): PropsOfType<T,IRule> { return this._namedRules as PropsOfType<T,IRule>; }

	/** Map of all rules. */
	public get unnamedRules(): IRule[] { return this._unnamedRules; }



	// Processes the given rule.
	public process( container: RuleContainer, owner: IRuleContainerOwner, ruleName: string)
	{
		super.process( container, owner, ruleName);

		// process sub-rules
		this.processRules();
	}



	/** Only needed to distinguish from other types */
	public get isGroupRule(): boolean { return true; }
}



