import { CssColor, MediaStatement } from "mimcss";
import { ICustomWebElements, ExtendedElement } from "./CompTypes";
import { ReferrerPolicyPropType, FormtargetPropType, CrossoriginPropType, FormenctypePropType, FormmethodPropType, IElementAttrs, IElementEvents, SandboxPropType, FetchpriorityPropType, IDPropType } from "./ElementTypes";
/**
 * Defines attributes common to all HTML elements
 */
export interface IHtmlElementAttrs extends IElementAttrs {
    accesskey?: string | string[];
    autocapitalize?: "off" | "none" | "on" | "sentences" | "words" | "characters";
    autofocus?: boolean;
    contenteditable?: boolean | "true" | "false";
    dir?: "ltr" | "rtl" | "auto";
    enterkeyhint?: "enter" | "done" | "go" | "next" | "previous" | "search" | "send";
    exportparts?: string | string[];
    hidden?: boolean | "" | "hidden" | "until-found";
    inert?: boolean;
    inputmode?: "none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url";
    is?: keyof ICustomWebElements;
    itemid?: string;
    itemprop?: string;
    itemref?: string | string[];
    itemscope?: boolean;
    itemtype?: string;
    nonce?: string;
    part?: string | string[];
    slot?: string;
    spellcheck?: "true" | "false" | "default";
    title?: string;
    translate?: boolean | "yes" | "no";
}
/**
 * Defines events common to all HTML elements
 */
export interface IHtmlElementEvents extends IElementEvents {
}
/**
 * Represents elements that can be used as fields in a form; that is, they can be associated with
 * a form.
 */
export interface IHtmlFormFieldElementAttrs extends IHtmlElementAttrs {
    disabled?: boolean;
    form?: IDPropType;
    name?: string;
}
/**
 * Represents elements that are used to link to resources.
 */
export interface IHtmlLinkLikeElementAttrs extends IHtmlElementAttrs {
    download?: string;
    href?: string;
    hreflang?: string;
    ping?: string | string[];
    referrerpolicy?: ReferrerPolicyPropType;
    rel?: string;
    target?: FormtargetPropType;
}
export interface IHtmlAElementAttrs extends IHtmlLinkLikeElementAttrs {
    type?: string;
}
export interface IHtmlAbbrElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlAddressElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlAreaElementAttrs extends IHtmlLinkLikeElementAttrs {
    alt?: string;
    coords?: string | number[];
    shape?: "rect" | "circle" | "poly" | "default";
}
export interface IHtmlArticleElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlAsideElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlAudioElementAttrs extends IHtmlElementAttrs {
    autoplay?: boolean;
    controls?: boolean;
    crossorigin?: CrossoriginPropType;
    loop?: boolean;
    muted?: boolean;
    preload?: "none" | "metadata" | "auto" | "";
    src?: string;
}
export interface IHtmlBElementAttrs extends IHtmlElementAttrs {
    href?: string;
    target?: FormtargetPropType;
}
export interface IHtmlBaseElementAttrs extends IHtmlElementAttrs {
    href?: string;
    target?: FormtargetPropType;
}
export interface IHtmlBdiElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlBdoElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlBlockquoteElementAttrs extends IHtmlElementAttrs {
    cite?: string;
}
export interface IHtmlBodyElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlBrElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlButtonElementAttrs extends IHtmlFormFieldElementAttrs {
    autofocus?: boolean;
    formaction?: string;
    formenctype?: FormenctypePropType;
    formmethod?: FormmethodPropType;
    formnovalidate?: boolean;
    formtarget?: FormtargetPropType;
    type?: "submit" | "reset" | "button";
    value?: string;
}
export interface IHtmlCanvasElementAttrs extends IHtmlElementAttrs {
    height?: number;
    width?: number;
}
export interface IHtmlCaptionElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlCiteElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlCodeElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlColElementAttrs extends IHtmlElementAttrs {
    span?: number;
}
export interface IHtmlColgroupElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlDataElementAttrs extends IHtmlElementAttrs {
    value?: string | number;
}
export interface IHtmlDataListElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlDdElementAttrs extends IHtmlElementAttrs {
    nowrap?: "yes" | "no";
}
export interface IHtmlDelElementAttrs extends IHtmlElementAttrs {
    cite?: string;
    datetime?: string | Date;
}
export interface IHtmlDetailsElementAttrs extends IHtmlElementAttrs {
    open?: boolean;
}
export interface IHtmlDfnElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlDialogElementAttrs extends IHtmlElementAttrs {
    open?: boolean;
}
export interface IHtmlDivElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlDlElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlDtElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlEmElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlEmbedElementAttrs extends IHtmlElementAttrs {
    height?: number;
    src?: string;
    type?: string;
    width?: number;
}
export interface IHtmlFieldsetElementAttrs extends IHtmlFormFieldElementAttrs {
}
export interface IHtmlFigCaptionElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlFigureElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlFooterElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlFormElementAttrs extends IHtmlElementAttrs {
    acceptCharset?: string;
    action?: string;
    autocomplete?: "on" | "off";
    enctype?: FormenctypePropType;
    method?: FormmethodPropType;
    name?: string;
    novalidate?: boolean;
    rel?: string;
    target?: string | FormtargetPropType;
}
export interface IHtmlHnElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlH1ElementAttrs extends IHtmlHnElementAttrs {
}
export interface IHtmlH2ElementAttrs extends IHtmlHnElementAttrs {
}
export interface IHtmlH3ElementAttrs extends IHtmlHnElementAttrs {
}
export interface IHtmlH4ElementAttrs extends IHtmlHnElementAttrs {
}
export interface IHtmlH5ElementAttrs extends IHtmlHnElementAttrs {
}
export interface IHtmlH6ElementAttrs extends IHtmlHnElementAttrs {
}
export interface IHtmlHeadElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlHeaderElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlHgroupElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlHrElementAttrs extends IHtmlElementAttrs {
    align?: string;
    color?: CssColor;
    noshade?: boolean;
    size?: number;
    width?: number;
}
export interface IHtmlHtmlElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlIElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlIframeElementAttrs extends IHtmlElementAttrs {
    allow?: string;
    allowfullscreen?: boolean;
    allowpaymentrequest?: boolean;
    csp?: string;
    height?: number;
    loading?: "eager" | "lazy";
    name?: string;
    referrerpolicy?: ReferrerPolicyPropType;
    sandbox?: SandboxPropType | SandboxPropType[];
    src?: string | "about:blank";
    srcdoc?: string;
    width?: number;
}
export interface IHtmlImgElementAttrs extends IHtmlElementAttrs {
    alt?: string;
    crossorigin?: CrossoriginPropType;
    decoding?: "auto" | "sync" | "async";
    fetchpriority?: FetchpriorityPropType;
    height?: number;
    intrinsicsize?: boolean;
    ismap?: boolean;
    loading?: "eager" | "lazy";
    referrerpolicy?: ReferrerPolicyPropType;
    sizes?: string | string[];
    src?: string;
    srcset?: string | string[];
    width?: number;
    usemap?: string;
}
export interface IHtmlInputElementAttrs extends IHtmlFormFieldElementAttrs {
    autocomplete?: string;
    max?: string | number | Date;
    list?: IDPropType;
    maxlength?: number;
    min?: string | number | Date;
    minlength?: number;
    multiple?: boolean;
    pattern?: string | RegExp;
    placeholder?: string;
    readonly?: boolean;
    required?: boolean;
    step?: number | "any";
    size?: number;
    type?: "button" | "checkbox" | "color" | "date" | "datetime" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week";
    value?: string | number | Date;
    dirname?: string;
    defaultValue?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    accept?: string;
    capture?: "user" | "environment";
    formaction?: string;
    formenctype?: FormenctypePropType;
    formmethod?: FormmethodPropType;
    formnovalidate?: boolean;
    formtarget?: string | FormtargetPropType;
    alt?: string;
    height?: number;
    src?: string;
    width?: number;
}
export interface IHtmlInsElementAttrs extends IHtmlElementAttrs {
    cite?: string;
    datetime?: string | Date;
}
export interface IHtmlKbdElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlLabelElementAttrs extends IHtmlElementAttrs {
    for?: IDPropType;
    htmlFor?: IDPropType;
}
export interface IHtmlLegendElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlLiElementAttrs extends IHtmlElementAttrs {
    value?: number;
    type?: "a" | "A" | "i" | "vsides" | "I" | "1";
}
export interface IHtmlLinkElementAttrs extends IHtmlLinkLikeElementAttrs {
    as?: string;
    blocking?: "render";
    crossorigin?: CrossoriginPropType;
    fetchpriority?: FetchpriorityPropType;
    href?: string;
    hreflang?: string;
    integrity?: string;
    media?: MediaStatement;
    prefetch?: string;
    sizes?: string;
    type?: string;
}
export interface IHtmlMainElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlMapElementAttrs extends IHtmlElementAttrs {
    name?: string;
}
export interface IHtmlMarkElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlMenuElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlMenuitemElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlMetaElementAttrs extends IHtmlElementAttrs {
    charset?: string;
    content?: string | number | Date;
    "http-equiv"?: string;
    name?: string;
}
export interface IHtmlMeterElementAttrs extends IHtmlElementAttrs {
    high?: number;
    low?: number;
    min?: number;
    max?: number;
    optimum?: number;
    value?: number;
}
export interface IHtmlNavElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlNoscriptElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlObjectElementAttrs extends IHtmlElementAttrs {
    data?: string;
    form?: IDPropType;
    height?: number;
    name?: string;
    type?: string;
    usemap?: string;
    width?: number;
}
export interface IHtmlOlElementAttrs extends IHtmlElementAttrs {
    reversed?: boolean;
    start?: number;
    type?: "a" | "A" | "i" | "I" | "1";
}
export interface IHtmlOptgroupElementAttrs extends IHtmlElementAttrs {
    disabled?: boolean;
    label: string;
}
export interface IHtmlOptionElementAttrs extends IHtmlElementAttrs {
    disabled?: boolean;
    label?: string;
    selected?: boolean;
    value?: string;
}
export interface IHtmlOutputElementAttrs extends IHtmlFormFieldElementAttrs {
    for?: IDPropType | IDPropType[];
    htmlFor?: IDPropType | IDPropType[];
}
export interface IHtmlPElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlParamElementAttrs extends IHtmlElementAttrs {
    name?: string;
    value?: string;
}
export interface IHtmlPictureElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlPreElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlProgressElementAttrs extends IHtmlElementAttrs {
    max?: number;
    value?: number;
}
export interface IHtmlQElementAttrs extends IHtmlElementAttrs {
    cite?: string;
}
export interface IHtmlRpElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlRtElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlRubyElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlSElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlSampElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlScriptElementAttrs extends IHtmlElementAttrs {
    async?: boolean;
    crossorigin?: CrossoriginPropType;
    defer?: boolean;
    fetchpriority?: FetchpriorityPropType;
    integrity?: string;
    nomodule?: boolean;
    nonce?: string;
    referrerpolicy?: ReferrerPolicyPropType;
    src?: string;
    type?: string;
    blocking?: "render";
}
export interface IHtmlSectionElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlSelectElementAttrs extends IHtmlFormFieldElementAttrs {
    autocomplete?: string;
    multiple?: boolean;
    required?: boolean;
    size?: number;
}
export interface IHtmlSlotElementAttrs extends IHtmlElementAttrs {
    name?: string;
}
export interface IHtmlSmallElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlSourceElementAttrs extends IHtmlElementAttrs {
    height?: number;
    media?: MediaStatement;
    sizes?: string;
    src?: string;
    srcset?: string | string[];
    type?: string;
    width?: number;
}
export interface IHtmlSpanElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlStrongElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlStyleElementAttrs extends IHtmlElementAttrs {
    media?: MediaStatement;
    nonce?: string;
    title?: string;
    blocking?: "render";
}
export interface IHtmlSubElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlSummaryElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlSupElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlTableElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlTbodyElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlTdElementAttrs extends IHtmlElementAttrs {
    colspan?: number;
    headers?: IDPropType | IDPropType[];
    rowspan?: number;
}
export interface IHtmlTemplateElementAttrs extends IHtmlElementAttrs {
    shadowroot?: "open" | "closed";
}
export interface IHtmlTextareaElementAttrs extends IHtmlFormFieldElementAttrs {
    autocomplete?: string;
    autocorrect?: "on" | "off";
    cols?: number;
    maxlength?: number;
    minlength?: number;
    placeholder?: string;
    readonly?: boolean;
    required?: boolean;
    rows?: number;
    wrap?: "hard" | "soft" | "off";
}
export interface IHtmlTfootElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlThElementAttrs extends IHtmlElementAttrs {
    abbr?: string;
    colspan?: number;
    headers?: IDPropType | IDPropType[];
    rowspan?: number;
    scope?: "row" | "col" | "rowgroup" | "colgroup";
    wrap?: "hard" | "soft" | "off";
}
export interface IHtmlTHeadElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlTimeElementAttrs extends IHtmlElementAttrs {
    datetime?: string | Date;
}
export interface IHtmlTitleElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlTrElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlTrackElementAttrs extends IHtmlElementAttrs {
    default?: boolean;
    kind?: "subtitles" | "captions" | "descriptions" | "chapters" | "metadata";
    label?: string;
    src?: string;
    srclang?: string;
}
export interface IHtmlUElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlUlElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlVarElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlVideoElementAttrs extends IHtmlElementAttrs {
    autoplay?: boolean;
    buffered?: boolean;
    controls?: boolean;
    crossorigin?: CrossoriginPropType;
    height?: number;
    loop?: boolean;
    muted?: boolean;
    playsinline?: boolean;
    poster?: string;
    preload?: "none" | "metadata" | "auto" | "";
    src?: string;
    width?: number;
}
export interface IHtmlWbrElementAttrs extends IHtmlElementAttrs {
}
export interface IHtmlIntrinsicElements {
    a: ExtendedElement<HTMLAnchorElement, IHtmlAElementAttrs>;
    abbr: ExtendedElement<HTMLElement, IHtmlAbbrElementAttrs>;
    address: ExtendedElement<HTMLElement, IHtmlAddressElementAttrs>;
    area: ExtendedElement<HTMLAreaElement, IHtmlAreaElementAttrs>;
    article: ExtendedElement<HTMLElement, IHtmlArticleElementAttrs>;
    aside: ExtendedElement<HTMLElement, IHtmlAsideElementAttrs>;
    audio: ExtendedElement<HTMLAudioElement, IHtmlAudioElementAttrs>;
    b: ExtendedElement<HTMLElement, IHtmlBElementAttrs>;
    base: ExtendedElement<HTMLBaseElement, IHtmlBaseElementAttrs>;
    bdi: ExtendedElement<HTMLElement, IHtmlBdiElementAttrs>;
    bdo: ExtendedElement<HTMLElement, IHtmlBdoElementAttrs>;
    blockquote: ExtendedElement<HTMLQuoteElement, IHtmlBlockquoteElementAttrs>;
    body: ExtendedElement<HTMLElement, IHtmlBodyElementAttrs>;
    br: ExtendedElement<HTMLBRElement, IHtmlBrElementAttrs>;
    button: ExtendedElement<HTMLButtonElement, IHtmlButtonElementAttrs>;
    canvas: ExtendedElement<HTMLCanvasElement, IHtmlCanvasElementAttrs>;
    caption: ExtendedElement<HTMLTableCaptionElement, IHtmlCaptionElementAttrs>;
    cite: ExtendedElement<HTMLElement, IHtmlCiteElementAttrs>;
    code: ExtendedElement<HTMLElement, IHtmlCodeElementAttrs>;
    col: ExtendedElement<HTMLTableColElement, IHtmlColElementAttrs>;
    colgroup: ExtendedElement<HTMLTableColElement, IHtmlColgroupElementAttrs>;
    data: ExtendedElement<HTMLDataElement, IHtmlDataElementAttrs>;
    datalist: ExtendedElement<HTMLDataListElement, IHtmlDataListElementAttrs>;
    dd: ExtendedElement<HTMLElement, IHtmlDdElementAttrs>;
    del: ExtendedElement<HTMLModElement, IHtmlDelElementAttrs>;
    details: ExtendedElement<HTMLDetailsElement, IHtmlDetailsElementAttrs>;
    dfn: ExtendedElement<HTMLElement, IHtmlDfnElementAttrs>;
    dialog: ExtendedElement<HTMLDialogElement, IHtmlDialogElementAttrs>;
    div: ExtendedElement<HTMLDivElement, IHtmlDivElementAttrs>;
    dl: ExtendedElement<HTMLDListElement, IHtmlDlElementAttrs>;
    dt: ExtendedElement<HTMLElement, IHtmlDtElementAttrs>;
    em: ExtendedElement<HTMLElement, IHtmlEmElementAttrs>;
    embed: ExtendedElement<HTMLEmbedElement, IHtmlEmbedElementAttrs>;
    fieldset: ExtendedElement<HTMLFieldSetElement, IHtmlFieldsetElementAttrs>;
    figcaption: ExtendedElement<HTMLElement, IHtmlFigCaptionElementAttrs>;
    figure: ExtendedElement<HTMLElement, IHtmlFigureElementAttrs>;
    footer: ExtendedElement<HTMLElement, IHtmlFooterElementAttrs>;
    form: ExtendedElement<HTMLFormElement, IHtmlFormElementAttrs>;
    h1: ExtendedElement<HTMLHeadingElement, IHtmlH1ElementAttrs>;
    h2: ExtendedElement<HTMLHeadingElement, IHtmlH2ElementAttrs>;
    h3: ExtendedElement<HTMLHeadingElement, IHtmlH3ElementAttrs>;
    h4: ExtendedElement<HTMLHeadingElement, IHtmlH4ElementAttrs>;
    h5: ExtendedElement<HTMLHeadingElement, IHtmlH5ElementAttrs>;
    h6: ExtendedElement<HTMLHeadingElement, IHtmlH6ElementAttrs>;
    head: ExtendedElement<HTMLHeadElement, IHtmlHeadElementAttrs>;
    header: ExtendedElement<HTMLElement, IHtmlHeaderElementAttrs>;
    hgroup: ExtendedElement<HTMLElement, IHtmlHgroupElementAttrs>;
    hr: ExtendedElement<HTMLHRElement, IHtmlHrElementAttrs>;
    html: ExtendedElement<HTMLHtmlElement, IHtmlHtmlElementAttrs>;
    i: ExtendedElement<HTMLElement, IHtmlIElementAttrs>;
    iframe: ExtendedElement<HTMLIFrameElement, IHtmlIframeElementAttrs>;
    img: ExtendedElement<HTMLImageElement, IHtmlImgElementAttrs>;
    input: ExtendedElement<HTMLInputElement, IHtmlInputElementAttrs>;
    ins: ExtendedElement<HTMLModElement, IHtmlInsElementAttrs>;
    kbd: ExtendedElement<HTMLElement, IHtmlKbdElementAttrs>;
    label: ExtendedElement<HTMLLabelElement, IHtmlLabelElementAttrs>;
    legend: ExtendedElement<HTMLLegendElement, IHtmlLegendElementAttrs>;
    li: ExtendedElement<HTMLLIElement, IHtmlLiElementAttrs>;
    link: ExtendedElement<HTMLLinkElement, IHtmlLinkElementAttrs>;
    main: ExtendedElement<HTMLElement, IHtmlMainElementAttrs>;
    map: ExtendedElement<HTMLMapElement, IHtmlMapElementAttrs>;
    mark: ExtendedElement<HTMLElement, IHtmlMarkElementAttrs>;
    menu: ExtendedElement<HTMLMenuElement, IHtmlMenuElementAttrs>;
    menuitem: ExtendedElement<HTMLElement, IHtmlMenuitemElementAttrs>;
    meta: ExtendedElement<HTMLMetaElement, IHtmlMetaElementAttrs>;
    meter: ExtendedElement<HTMLMeterElement, IHtmlMeterElementAttrs>;
    nav: ExtendedElement<HTMLElement, IHtmlNavElementAttrs>;
    noscript: ExtendedElement<HTMLElement, IHtmlNoscriptElementAttrs>;
    object: ExtendedElement<HTMLObjectElement, IHtmlObjectElementAttrs>;
    ol: ExtendedElement<HTMLOListElement, IHtmlOlElementAttrs>;
    optgroup: ExtendedElement<HTMLOptGroupElement, IHtmlOptgroupElementAttrs>;
    option: ExtendedElement<HTMLOptionElement, IHtmlOptionElementAttrs>;
    output: ExtendedElement<HTMLOutputElement, IHtmlOutputElementAttrs>;
    p: ExtendedElement<HTMLParagraphElement, IHtmlPElementAttrs>;
    param: ExtendedElement<HTMLElement, IHtmlParamElementAttrs>;
    picture: ExtendedElement<HTMLPictureElement, IHtmlPictureElementAttrs>;
    pre: ExtendedElement<HTMLPreElement, IHtmlPreElementAttrs>;
    progress: ExtendedElement<HTMLProgressElement, IHtmlProgressElementAttrs>;
    q: ExtendedElement<HTMLQuoteElement, IHtmlQElementAttrs>;
    rp: ExtendedElement<HTMLElement, IHtmlRpElementAttrs>;
    rt: ExtendedElement<HTMLElement, IHtmlRtElementAttrs>;
    ruby: ExtendedElement<HTMLElement, IHtmlRubyElementAttrs>;
    s: ExtendedElement<HTMLElement, IHtmlSElementAttrs>;
    samp: ExtendedElement<HTMLElement, IHtmlSampElementAttrs>;
    script: ExtendedElement<HTMLScriptElement, IHtmlScriptElementAttrs>;
    section: ExtendedElement<HTMLElement, IHtmlSectionElementAttrs>;
    select: ExtendedElement<HTMLSelectElement, IHtmlSelectElementAttrs>;
    slot: ExtendedElement<HTMLSlotElement, IHtmlSlotElementAttrs>;
    small: ExtendedElement<HTMLElement, IHtmlSmallElementAttrs>;
    source: ExtendedElement<HTMLSourceElement, IHtmlSourceElementAttrs>;
    span: ExtendedElement<HTMLSpanElement, IHtmlSpanElementAttrs>;
    strong: ExtendedElement<HTMLElement, IHtmlStrongElementAttrs>;
    style: ExtendedElement<HTMLStyleElement, IHtmlStyleElementAttrs>;
    sub: ExtendedElement<HTMLElement, IHtmlSubElementAttrs>;
    summary: ExtendedElement<HTMLElement, IHtmlSummaryElementAttrs>;
    sup: ExtendedElement<HTMLElement, IHtmlSupElementAttrs>;
    table: ExtendedElement<HTMLTableElement, IHtmlTableElementAttrs>;
    tbody: ExtendedElement<HTMLTableSectionElement, IHtmlTbodyElementAttrs>;
    td: ExtendedElement<HTMLTableCellElement, IHtmlTdElementAttrs>;
    template: ExtendedElement<HTMLTemplateElement, IHtmlTemplateElementAttrs>;
    textarea: ExtendedElement<HTMLTextAreaElement, IHtmlTextareaElementAttrs>;
    tfoot: ExtendedElement<HTMLTableSectionElement, IHtmlTfootElementAttrs>;
    th: ExtendedElement<HTMLTableCellElement, IHtmlThElementAttrs>;
    thead: ExtendedElement<HTMLTableSectionElement, IHtmlTHeadElementAttrs>;
    time: ExtendedElement<HTMLTimeElement, IHtmlTimeElementAttrs>;
    title: ExtendedElement<HTMLTitleElement, IHtmlTitleElementAttrs>;
    tr: ExtendedElement<HTMLTableRowElement, IHtmlTrElementAttrs>;
    track: ExtendedElement<HTMLTrackElement, IHtmlTrackElementAttrs>;
    u: ExtendedElement<HTMLElement, IHtmlUElementAttrs>;
    ul: ExtendedElement<HTMLUListElement, IHtmlUlElementAttrs>;
    var: ExtendedElement<HTMLElement, IHtmlVarElementAttrs>;
    video: ExtendedElement<HTMLVideoElement, IHtmlVideoElementAttrs, HTMLVideoElementEventMap>;
    wbr: ExtendedElement<HTMLElement, IHtmlWbrElementAttrs>;
}
//# sourceMappingURL=HtmlTypes.d.ts.map