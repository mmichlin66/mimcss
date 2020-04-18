import {INamespaceRule} from "./RuleTypes"
import {Rule} from "./Rule"



/**
 * The NamespaceRule class describes a CSS @namespace rule.
 */
export class NamespaceRule extends Rule implements INamespaceRule
{
	public constructor( namespace: string, prefix?: string)
	{
		super();

		this.namespace = namespace;
		this.prefix = prefix;
	}



	// Creates a copy of the rule.
	public clone(): NamespaceRule
	{
		return new NamespaceRule( this.namespace, this.prefix);
	}



	// Inserts this rule into the given parent rule or stylesheet.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void
	{
		if (!this.namespace)
			return;

		let url = this.namespace.startsWith( "url(") ? this.namespace : `url(${this.namespace})`;
		this.cssRule = Rule.addRuleToDOM( `@namespace ${this.prefix ? this.prefix : ""} ${url}`,
			parent) as CSSNamespaceRule;
	}



	/** SOM namespace rule */
	public cssRule: CSSNamespaceRule;

	/** Namespace string for the rule */
	public namespace: string;

	/** Optional prefix for the rule */
	public prefix: string | undefined;

}



