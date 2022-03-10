import {IGridLineRule, IGridAreaRule, IStyleDefinition} from "../api/RuleTypes"
import {NamedRuleLike} from "./Rule";



/**
 * The GridLineRule class describes a named grid line definition. No CSS rule is created for grid
 * lines - they are needed only to provide type-safe grid line definitions.
 */
export class GridLineRule extends NamedRuleLike implements IGridLineRule
{
    // if the nameOverride is an area rule object, the isStartEndOrNone flag is always defined
    // because this constructor can only be invoked for the start and end lines of the GridAreaRule
    // object.
    public constructor( sd: IStyleDefinition, nameOverride?: string | IGridLineRule | IGridAreaRule,
        isStartEndOrNone?: boolean)
	{
        super( sd, nameOverride);
        this.isStartEndOrNone = isStartEndOrNone;
	}


	// Processes the given rule.
	public process( ruleName: string | null): void
	{
        let name: string;
        let areaName: string | undefined;
        let isStartEndOrNone: boolean | undefined = this.isStartEndOrNone;
        let nameOverride = this.nameOverride;
        if (nameOverride instanceof GridLineRule)
        {
            name = nameOverride.name;
            this.isStartEndOrNone = nameOverride.isStartEndOrNone;
            areaName = nameOverride.areaName;
        }
        else if (nameOverride instanceof GridAreaRule)
        {
            name = nameOverride.name + (isStartEndOrNone === true ? "-start" : isStartEndOrNone === false ? "-end" : "");
            areaName = nameOverride.name;
        }
        else
        {
            name = this.rc.getScopedName( ruleName, nameOverride);

            // if the obtained name doesn't have "-start" or "-end" but the isStartEndOrNone flag is
            // defined (that is, it is either start or end line), we need to append the suffix. If the
            // obtained name already has "-start" or "-end" and the isStartEndOrNone flag is not
            // defined, we set this flag to either true or false depending on the suffix. Note that if
            // the nameOverride is an area rule object, the isStartEndOrNone flag is always defined.
            let nameHasStart = name.endsWith("-start");
            let nameHasEnd = name.endsWith("-end");
            if (nameHasStart)
            {
                this.isStartEndOrNone = true;
                areaName = name.substr( 0, name.length - 6 /* "-start".length */);
            }
            else if (nameHasEnd)
            {
                isStartEndOrNone = false;
                areaName = name.substr( 0, name.length - 4 /* "-end".length */);
            }
            else if (isStartEndOrNone === true)
            {
                areaName = name;
                name += "-start";
            }
            else if (isStartEndOrNone === false)
            {
                areaName = name;
                name += "-end";
            }
        }

        this.name = name;
        this.areaName = areaName;
        this.isStartEndOrNone = isStartEndOrNone;
	}

	/**
     * Flag indicating whether the line is a start or end line of a grid area. The value is true
     * if this is the start line; false if this is the end line; and undefined if the line is
     * not related to any area.
     */
	public isStartEndOrNone: boolean | undefined;

    /**
     * Name of the grid area of which the line is either a start or an end line. It is defined
     * only if the line name ends with "-start" or "-end".
     */
	public areaName?: string;
}



/**
 * The GridAreaRule class describes a named grid area definition. No CSS rule is created for grid
 * areas - they are needed only to provide type-safe grid area definitions.
 */
export class GridAreaRule extends NamedRuleLike implements IGridAreaRule
{
    // if the nameOverride is an area rule object, the isStartEndOrNone flag is always defined
    // because this constructor can only be invoked for the start and end lines of the GridAreaRule
    // object.
    public constructor( sd: IStyleDefinition, nameOverride?: string | IGridAreaRule)
	{
        super( sd, nameOverride);

        // create line rules
        this.startLine = new GridLineRule( sd, this, true);
        this.endLine = new GridLineRule( sd, this, false);
	}

	// Processes the given rule.
	public process( ruleName: string | null): void
	{
        super.process( ruleName);

        // process line rules
        this.startLine.process( null);
        this.endLine.process( null);
	}

	/** Start line of the area. */
	public startLine: GridLineRule;

    /** End line of the area area. */
	public endLine: GridLineRule;
}



