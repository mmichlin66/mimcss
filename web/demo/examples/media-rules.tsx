// This example is taken from the article of Chris Coyier on css-tricks.com with names and emails changed.
// https://css-tricks.com/css-media-queries/
// Resize your browser window to see the effects

import * as mim from "mimbl";
import * as css from "mimcss"


class MyStyles extends css.StyleDefinition
{
    elementRules = [
        this.$tag( "*", {
            margin: 0,
            padding: 0 }
        ),

        this.$tag( "body", {
            fontSize: 14,
            fontFamily: "Georgia, serif",
            background: 0xcccccc
        }),

        this.$tag( ["article", "aside", "figure", "footer", "header", "hgroup", "menu", "nav", "section"], {
            display: "block"
        }),

        this.$tag( "h2", {
            fontSize: 24,
            fontFamily: "Georgia",
            margin: [0, 0, 10, 0]
        }),

        this.$tag( "h3", {
            margin: [0, 0, 8, 0]
        }),

        this.$tag( "p", {
            margin: [0, 0, 20, 0]
        }),
    ]

    fluidWrap = this.$id({
        width: "70%",
        margin: [60, "auto"],
        padding: 20,
        background: 0xeeeeee,
        overflow: "hidden"
    })

    sidebar = this.$id({
        width: "35%",
        float: "left"
    })

    sidebarRules = [
        this.$style( [this.sidebar, " ul"], {
            listStyle: "none"
        }),

        this.$style( [this.sidebar, " ul li a"], {
            color: 0x990000,
            textDecoration: "none",
            padding: [3, 0],
            display: "block"
        })
    ]

    mainContent = this.$id({
        width: "65%",
        float: "right"
    })

    // the media feature-set defines the media type and width condition
    ifWide = this.$media( { minWidth: 1001 },
        class extends css.StyleDefinition<MyStyles>
        {
            sidebarRules = [
                this.$style( [this.$parent.sidebar, " ul li a:after"], {
                    content: css.raw`" (" ${css.attr("data-email")} ")"`,
                    fontSize: 11,
                    fontStyle: "italic",
                    color: 0x666666
                })
            ]
        }
    )

    // Specifying range as an array, which will be translated to min-width and max-width features
    ifMedium = this.$media( { width: [700, 1000] },
        class extends css.StyleDefinition<MyStyles>
        {
            sidebarRules = [
                this.$style( [this.$parent.sidebar, " ul li a:before"], {
                    content: "\"Email: \"",
                    fontStyle: "italic",
                    color: 0x666666
                })
            ]
        }
    )

    // multiple feature-sets are combined with "or"
    ifNarrowOrVeryWide = this.$media( [
            { width: [520, 699] },
            { minWidth: 1151 }
        ],
        class extends css.StyleDefinition<MyStyles>
        {
            sidebarRules = [
                this.$style( [this.$parent.sidebar, " ul li a"], {
                    paddingLeft: 21,
                    background: {
                        image: css.url("examples/email.png"),
                        position: ["left", "center"],
                        repeat: "no-repeat"
                    }
                })
            ]
        }
    )
}

// activate our styles
let styles = css.activate( MyStyles);



class MyComponent extends mim.Component
{
	public render()
	{
		return <div id={styles.fluidWrap}>

            <div id={styles.sidebar}>
                <h3>Super team:</h3>
                <ul id="nav">
                    <li><a data-email="johndoe@mail.com" href="mailto:johndoe@mail.com">John Doe</a></li>
                    <li><a data-email="johnsmith@mail.com" href="mailto:johnsmith@mail.com">John Smith</a></li>
                    <li><a data-email="janedoe@mail.com" href="mailto:janedoe@mail.com">Jane Doe</a></li>
                </ul>
            </div>

            <div id={styles.mainContent}>
                <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam,
                    feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies
                    mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat
                    wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros
                    ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis.
                    Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam
                    erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>
                <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam,
                    feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies
                    mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat
                    wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros
                    ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis.
                    Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam
                    erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>
            </div>

      </div>
	}
}



// mount our component under the body element.
mim.mount( new MyComponent());


