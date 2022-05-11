import { CssColor, MediaStatement, IIDRule } from "mimcss";
import { IElementProps, ReferrerPolicyPropType, FormtargetPropType, CrossoriginPropType, FormenctypePropType, FormmethodPropType, ExtendedElementAttr } from "./CompTypes";
/**
 * Contains global HTML attributes
 */
export interface IHtmlElementProps<TRef extends HTMLElement = HTMLElement> extends IElementProps<TRef> {
    accesskey?: ExtendedElementAttr<string>;
    autocapitalize?: ExtendedElementAttr<"off" | "none" | "on" | "sentences" | "words" | "characters">;
    autofocus?: ExtendedElementAttr<boolean>;
    contenteditable?: ExtendedElementAttr<boolean>;
    dir?: ExtendedElementAttr<"ltr" | "rtl" | "auto">;
    enterkeyhint?: ExtendedElementAttr<string>;
    hidden?: ExtendedElementAttr<boolean>;
    inputmode?: ExtendedElementAttr<"none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url">;
    is?: ExtendedElementAttr<string>;
    itemid?: ExtendedElementAttr<string>;
    itemprop?: ExtendedElementAttr<string>;
    itemref?: ExtendedElementAttr<string>;
    itemscope?: ExtendedElementAttr<boolean>;
    itemtype?: ExtendedElementAttr<string>;
    nonce?: ExtendedElementAttr<string>;
    part?: ExtendedElementAttr<string>;
    slot?: ExtendedElementAttr<string>;
    spellcheck?: ExtendedElementAttr<boolean | "default">;
    title?: ExtendedElementAttr<string>;
    translate?: ExtendedElementAttr<boolean | "yes" | "no">;
}
export interface IHtmlAElementProps extends IHtmlElementProps<HTMLAnchorElement> {
    download?: ExtendedElementAttr<string>;
    href?: ExtendedElementAttr<string>;
    hreflang?: ExtendedElementAttr<string>;
    ping?: ExtendedElementAttr<string | string[]>;
    referrerpolicy?: ExtendedElementAttr<ReferrerPolicyPropType>;
    rel?: ExtendedElementAttr<string>;
    target?: ExtendedElementAttr<FormtargetPropType>;
    type?: ExtendedElementAttr<string>;
}
export interface IHtmlAreaElementProps extends IHtmlElementProps<HTMLAreaElement> {
    alt?: ExtendedElementAttr<string>;
    coords?: ExtendedElementAttr<string | number[]>;
    download?: ExtendedElementAttr<string>;
    href?: ExtendedElementAttr<string>;
    hreflang?: ExtendedElementAttr<string>;
    ping?: ExtendedElementAttr<string>;
    referrerpolicy?: ExtendedElementAttr<ReferrerPolicyPropType>;
    rel?: ExtendedElementAttr<string>;
    shape?: ExtendedElementAttr<"rect" | "circle" | "poly" | "default">;
    target?: ExtendedElementAttr<FormtargetPropType>;
}
export interface IHtmlAudioElementProps extends IHtmlElementProps<HTMLAudioElement> {
    autoplay?: ExtendedElementAttr<boolean>;
    controls?: ExtendedElementAttr<boolean>;
    crossorigin?: ExtendedElementAttr<CrossoriginPropType>;
    loop?: ExtendedElementAttr<boolean>;
    muted?: ExtendedElementAttr<boolean>;
    preload?: ExtendedElementAttr<"none" | "metadata" | "auto" | "">;
    src?: ExtendedElementAttr<string>;
}
export interface IHtmlBaseElementProps extends IHtmlElementProps<HTMLBaseElement> {
    href?: ExtendedElementAttr<string>;
    target?: ExtendedElementAttr<FormtargetPropType>;
}
export interface IHtmlBlockquoteElementProps extends IHtmlElementProps<HTMLQuoteElement> {
    cite?: ExtendedElementAttr<string>;
}
export interface IHtmlBrElementProps extends IHtmlElementProps<HTMLBRElement> {
}
export interface IHtmlButtonElementProps extends IHtmlElementProps<HTMLButtonElement> {
    disabled?: ExtendedElementAttr<boolean>;
    form?: ExtendedElementAttr<string>;
    formaction?: ExtendedElementAttr<string>;
    formenctype?: ExtendedElementAttr<FormenctypePropType>;
    formmethod?: ExtendedElementAttr<FormmethodPropType>;
    formnovalidate?: ExtendedElementAttr<boolean>;
    formtarget?: ExtendedElementAttr<FormtargetPropType>;
    name?: ExtendedElementAttr<string>;
    type?: ExtendedElementAttr<"submit" | "reset" | "button">;
    value?: ExtendedElementAttr<string>;
}
export interface IHtmlCanvasElementProps extends IHtmlElementProps<HTMLCanvasElement> {
    height?: ExtendedElementAttr<number>;
    width?: ExtendedElementAttr<number>;
}
export interface IHtmlCaptionElementProps extends IHtmlElementProps<HTMLTableCaptionElement> {
}
export interface IHtmlColElementProps extends IHtmlElementProps<HTMLTableColElement> {
    span?: ExtendedElementAttr<number>;
}
export interface IHtmlColgroupElementProps extends IHtmlElementProps<HTMLTableColElement> {
}
export interface IHtmlDataElementProps extends IHtmlElementProps<HTMLDataElement> {
    value?: ExtendedElementAttr<string | number | boolean>;
}
export interface IHtmlDataListElementProps extends IHtmlElementProps<HTMLDataListElement> {
}
export interface IHtmlDdElementProps extends IHtmlElementProps {
    nowrap?: ExtendedElementAttr<boolean>;
}
export interface IHtmlDelElementProps extends IHtmlElementProps<HTMLModElement> {
    cite?: ExtendedElementAttr<string>;
    datetime?: ExtendedElementAttr<string | Date>;
}
export interface IHtmlDetailsElementProps extends IHtmlElementProps<HTMLDetailsElement> {
    open?: ExtendedElementAttr<boolean>;
}
export interface IHtmlDialogElementProps extends IHtmlElementProps<HTMLDialogElement> {
    open?: ExtendedElementAttr<boolean>;
}
export interface IHtmlDivElementProps extends IHtmlElementProps<HTMLDivElement> {
    noWrap?: ExtendedElementAttr<boolean>;
}
export interface IHtmlDlElementProps extends IHtmlElementProps<HTMLDListElement> {
    compact?: ExtendedElementAttr<boolean>;
}
export interface IHtmlEmbedElementProps extends IHtmlElementProps<HTMLEmbedElement> {
    height?: ExtendedElementAttr<number>;
    src?: ExtendedElementAttr<string>;
    type?: ExtendedElementAttr<string>;
    width?: ExtendedElementAttr<number>;
}
export interface IHtmlFieldsetElementProps extends IHtmlElementProps<HTMLFieldSetElement> {
    disabled?: ExtendedElementAttr<boolean>;
    form?: ExtendedElementAttr<string>;
    name?: ExtendedElementAttr<string>;
}
export interface IHtmlFormElementProps extends IHtmlElementProps<HTMLFormElement> {
    acceptCharset?: ExtendedElementAttr<string | "UNKNOWN">;
    action?: ExtendedElementAttr<string>;
    autocomplete?: ExtendedElementAttr<boolean>;
    enctype?: ExtendedElementAttr<FormenctypePropType>;
    method?: ExtendedElementAttr<FormmethodPropType>;
    name?: ExtendedElementAttr<string>;
    novalidate?: ExtendedElementAttr<boolean>;
    target?: ExtendedElementAttr<string | FormtargetPropType>;
}
export interface IHtmlH1ElementProps extends IHtmlElementProps<HTMLHeadingElement> {
}
export interface IHtmlH2ElementProps extends IHtmlElementProps<HTMLHeadingElement> {
}
export interface IHtmlH3ElementProps extends IHtmlElementProps<HTMLHeadingElement> {
}
export interface IHtmlH4ElementProps extends IHtmlElementProps<HTMLHeadingElement> {
}
export interface IHtmlH5ElementProps extends IHtmlElementProps<HTMLHeadingElement> {
}
export interface IHtmlH6ElementProps extends IHtmlElementProps<HTMLHeadingElement> {
}
export interface IHtmlHeadElementProps extends IHtmlElementProps<HTMLHeadElement> {
}
export interface IHtmlHrElementProps extends IHtmlElementProps<HTMLHRElement> {
    align?: ExtendedElementAttr<string>;
    color?: ExtendedElementAttr<CssColor>;
    noshade?: ExtendedElementAttr<boolean>;
    size?: ExtendedElementAttr<number>;
    width?: ExtendedElementAttr<number>;
}
export interface IHtmlHtmlElementProps extends IHtmlElementProps<HTMLHtmlElement> {
}
export interface IHtmlIframeElementProps extends IHtmlElementProps<HTMLIFrameElement> {
    allow?: ExtendedElementAttr<string>;
    allowfullscreen?: ExtendedElementAttr<boolean>;
    allowpaymentrequest?: ExtendedElementAttr<boolean>;
    csp?: ExtendedElementAttr<string>;
    height?: ExtendedElementAttr<number>;
    loading?: ExtendedElementAttr<"eager" | "lazy">;
    name?: ExtendedElementAttr<string>;
    referrerpolicy?: ExtendedElementAttr<ReferrerPolicyPropType>;
    sandbox?: ExtendedElementAttr<string>;
    src?: ExtendedElementAttr<string | "about:blank">;
    srcdoc?: ExtendedElementAttr<string>;
    width?: ExtendedElementAttr<number>;
}
export interface IHtmlImgElementProps extends IHtmlElementProps<HTMLImageElement> {
    alt?: ExtendedElementAttr<string>;
    crossorigin?: ExtendedElementAttr<CrossoriginPropType>;
    decoding?: ExtendedElementAttr<"auto" | "sync" | "async">;
    height?: ExtendedElementAttr<number>;
    intrinsicsize?: ExtendedElementAttr<boolean>;
    ismap?: ExtendedElementAttr<boolean>;
    loading?: ExtendedElementAttr<"eager" | "lazy">;
    referrerpolicy?: ExtendedElementAttr<ReferrerPolicyPropType>;
    sizes?: ExtendedElementAttr<string>;
    src?: ExtendedElementAttr<string>;
    srcset?: ExtendedElementAttr<string>;
    width?: ExtendedElementAttr<number>;
    usemap?: ExtendedElementAttr<string>;
}
export interface IHtmlInputElementProps extends IHtmlElementProps<HTMLInputElement> {
    autocomplete?: ExtendedElementAttr<string | boolean>;
    disabled?: ExtendedElementAttr<boolean>;
    form?: ExtendedElementAttr<string>;
    list?: ExtendedElementAttr<string>;
    name?: ExtendedElementAttr<string>;
    readonly?: ExtendedElementAttr<boolean>;
    required?: ExtendedElementAttr<boolean>;
    type?: ExtendedElementAttr<"button" | "checkbox" | "color" | "date" | "datetime" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week">;
    value?: ExtendedElementAttr<string>;
    checked?: ExtendedElementAttr<boolean>;
    defaultValue?: ExtendedElementAttr<string>;
    defaultChecked?: ExtendedElementAttr<boolean>;
    max?: ExtendedElementAttr<string | number>;
    min?: ExtendedElementAttr<string | number>;
    step?: ExtendedElementAttr<number | "any">;
    multiple?: ExtendedElementAttr<boolean>;
    placeholder?: ExtendedElementAttr<string>;
    maxlength?: ExtendedElementAttr<number>;
    minlength?: ExtendedElementAttr<string>;
    size?: ExtendedElementAttr<number>;
    pattern?: ExtendedElementAttr<string>;
    accept?: ExtendedElementAttr<string>;
    capture?: ExtendedElementAttr<"user" | "environment">;
    formaction?: ExtendedElementAttr<string>;
    formenctype?: ExtendedElementAttr<FormenctypePropType>;
    formmethod?: ExtendedElementAttr<FormmethodPropType>;
    formnovalidate?: ExtendedElementAttr<boolean>;
    formtarget?: ExtendedElementAttr<string | FormtargetPropType>;
    alt?: ExtendedElementAttr<string>;
    height?: ExtendedElementAttr<number>;
    src?: ExtendedElementAttr<string>;
    width?: ExtendedElementAttr<number>;
}
export interface IHtmlInsElementProps extends IHtmlElementProps<HTMLModElement> {
    cite?: ExtendedElementAttr<string>;
    datetime?: ExtendedElementAttr<string | Date>;
}
export interface IHtmlLabelElementProps extends IHtmlElementProps<HTMLLabelElement> {
    for?: ExtendedElementAttr<string | IIDRule>;
    htmlFor?: ExtendedElementAttr<string | IIDRule>;
    form?: ExtendedElementAttr<string>;
}
export interface IHtmlLegendElementProps extends IHtmlElementProps<HTMLLegendElement> {
}
export interface IHtmlLiElementProps extends IHtmlElementProps<HTMLLIElement> {
    value?: ExtendedElementAttr<number>;
    type?: ExtendedElementAttr<"a" | "A" | "i" | "vsides" | "I" | "1">;
}
export interface IHtmlLinkElementProps extends IHtmlElementProps<HTMLLinkElement> {
    as?: ExtendedElementAttr<string>;
    crossorigin?: ExtendedElementAttr<CrossoriginPropType>;
    href?: ExtendedElementAttr<string>;
    hrefLang?: ExtendedElementAttr<string>;
    integrity?: ExtendedElementAttr<string>;
    media?: ExtendedElementAttr<MediaStatement>;
    referrerpolicy?: ExtendedElementAttr<ReferrerPolicyPropType>;
    rel?: ExtendedElementAttr<string>;
    sizes?: ExtendedElementAttr<string>;
    type?: ExtendedElementAttr<string>;
    disabled?: ExtendedElementAttr<boolean>;
    methods?: ExtendedElementAttr<string>;
    prefetch?: ExtendedElementAttr<string>;
    target?: ExtendedElementAttr<string>;
}
export interface IHtmlListingElementProps extends IHtmlElementProps<HTMLPreElement> {
}
export interface IHtmlMapElementProps extends IHtmlElementProps<HTMLMapElement> {
    name?: ExtendedElementAttr<string>;
}
export interface IHtmlMenuElementProps extends IHtmlElementProps<HTMLMenuElement> {
}
export interface IHtmlMetaElementProps extends IHtmlElementProps<HTMLMetaElement> {
    charset?: ExtendedElementAttr<string>;
    content?: ExtendedElementAttr<string>;
    httpEquiv?: ExtendedElementAttr<string>;
    name?: ExtendedElementAttr<string>;
}
export interface IHtmlMeterElementProps extends IHtmlElementProps<HTMLMeterElement> {
    form?: ExtendedElementAttr<string>;
    high?: ExtendedElementAttr<number>;
    low?: ExtendedElementAttr<number>;
    min?: ExtendedElementAttr<number>;
    max?: ExtendedElementAttr<number>;
    optimum?: ExtendedElementAttr<number>;
    value?: ExtendedElementAttr<number>;
}
export interface IHtmlObjectElementProps extends IHtmlElementProps<HTMLObjectElement> {
    charset?: ExtendedElementAttr<string>;
    content?: ExtendedElementAttr<string>;
    httpEquiv?: ExtendedElementAttr<string>;
    name?: ExtendedElementAttr<string>;
}
export interface IHtmlOlElementProps extends IHtmlElementProps<HTMLOListElement> {
    reversed?: ExtendedElementAttr<boolean>;
    start?: ExtendedElementAttr<number>;
    type?: ExtendedElementAttr<"a" | "A" | "i" | "I" | "1">;
    name?: ExtendedElementAttr<string>;
}
export interface IHtmlOptgroupElementProps extends IHtmlElementProps<HTMLOptGroupElement> {
    disabled?: ExtendedElementAttr<boolean>;
    label: ExtendedElementAttr<string>;
}
export interface IHtmlOptionElementProps extends IHtmlElementProps<HTMLOptionElement> {
    disabled?: ExtendedElementAttr<boolean>;
    label?: ExtendedElementAttr<string>;
    selected?: ExtendedElementAttr<boolean>;
    value?: ExtendedElementAttr<string>;
}
export interface IHtmlOutputElementProps extends IHtmlElementProps<HTMLOutputElement> {
    forInputs?: ExtendedElementAttr<string>;
    form?: ExtendedElementAttr<string>;
    name?: ExtendedElementAttr<string>;
}
export interface IHtmlPElementProps extends IHtmlElementProps<HTMLParagraphElement> {
}
export interface IHtmlParamElementProps extends IHtmlElementProps<HTMLParamElement> {
    name?: ExtendedElementAttr<string>;
    value?: ExtendedElementAttr<string>;
}
export interface IHtmlPictureElementProps extends IHtmlElementProps<HTMLPictureElement> {
}
export interface IHtmlPreElementProps extends IHtmlElementProps<HTMLPreElement> {
}
export interface IHtmlProgressElementProps extends IHtmlElementProps<HTMLProgressElement> {
    max?: ExtendedElementAttr<number>;
    value?: ExtendedElementAttr<number>;
}
export interface IHtmlQElementProps extends IHtmlElementProps<HTMLQuoteElement> {
    cite?: ExtendedElementAttr<string>;
}
export interface IHtmlScriptElementProps extends IHtmlElementProps<HTMLScriptElement> {
    async?: ExtendedElementAttr<boolean>;
    crossorigin?: ExtendedElementAttr<CrossoriginPropType>;
    defer?: ExtendedElementAttr<boolean>;
    integrity?: ExtendedElementAttr<string>;
    nomodule?: ExtendedElementAttr<boolean>;
    nonce?: ExtendedElementAttr<string>;
    src?: ExtendedElementAttr<string>;
    text?: ExtendedElementAttr<string>;
    type?: ExtendedElementAttr<string>;
}
export interface IHtmlSelectElementProps extends IHtmlElementProps<HTMLSelectElement> {
    autocomplete?: ExtendedElementAttr<string>;
    disabled?: ExtendedElementAttr<boolean>;
    form?: ExtendedElementAttr<string>;
    multiple?: ExtendedElementAttr<boolean>;
    name?: ExtendedElementAttr<string>;
    required?: ExtendedElementAttr<boolean>;
    size?: ExtendedElementAttr<number>;
}
export interface IHtmlSlotElementProps extends IHtmlElementProps<HTMLSlotElement> {
}
export interface IHtmlSourceElementProps extends IHtmlElementProps<HTMLSourceElement> {
    media?: ExtendedElementAttr<MediaStatement>;
    sizes?: ExtendedElementAttr<string>;
    src?: ExtendedElementAttr<string>;
    srcset?: ExtendedElementAttr<string>;
    type?: ExtendedElementAttr<string>;
}
export interface IHtmlSpanElementProps extends IHtmlElementProps<HTMLSpanElement> {
}
export interface IHtmlStyleElementProps extends IHtmlElementProps<HTMLStyleElement> {
    media?: ExtendedElementAttr<MediaStatement>;
    nonce?: ExtendedElementAttr<string>;
    title?: ExtendedElementAttr<string>;
    type?: ExtendedElementAttr<string>;
}
export interface IHtmlTableElementProps extends IHtmlElementProps<HTMLTableElement> {
    data?: ExtendedElementAttr<string>;
    form?: ExtendedElementAttr<string>;
    hight?: ExtendedElementAttr<number>;
    name?: ExtendedElementAttr<string>;
    type?: ExtendedElementAttr<string>;
    typemustmatch?: ExtendedElementAttr<boolean>;
    usemap?: ExtendedElementAttr<string>;
    width?: ExtendedElementAttr<number>;
}
export interface IHtmlTbodyElementProps extends IHtmlElementProps<HTMLTableSectionElement> {
}
export interface IHtmlTdElementProps extends IHtmlElementProps<HTMLTableDataCellElement> {
    colspan?: ExtendedElementAttr<number>;
    headers?: ExtendedElementAttr<string>;
    rowspan?: ExtendedElementAttr<number>;
    width?: ExtendedElementAttr<number>;
}
export interface IHtmlTemplateElementProps extends IHtmlElementProps<HTMLTemplateElement> {
}
export interface IHtmlTextareaElementProps extends IHtmlElementProps<HTMLTextAreaElement> {
    autocomplete?: ExtendedElementAttr<string>;
    cols?: ExtendedElementAttr<number>;
    disabled?: ExtendedElementAttr<boolean>;
    form?: ExtendedElementAttr<string>;
    maxlength?: ExtendedElementAttr<number>;
    minlength?: ExtendedElementAttr<number>;
    name?: ExtendedElementAttr<string>;
    placeholder?: ExtendedElementAttr<string>;
    readonly?: ExtendedElementAttr<boolean>;
    required?: ExtendedElementAttr<boolean>;
    rows?: ExtendedElementAttr<number>;
    wrap?: ExtendedElementAttr<"hard" | "soft" | "off">;
}
export interface IHtmlTfootElementProps extends IHtmlElementProps<HTMLTableSectionElement> {
}
export interface IHtmlTHeadElementProps extends IHtmlElementProps<HTMLTableSectionElement> {
}
export interface IHtmlThElementProps extends IHtmlElementProps<HTMLTableHeaderCellElement> {
    abbr?: ExtendedElementAttr<string>;
    colspan?: ExtendedElementAttr<number>;
    headers?: ExtendedElementAttr<string>;
    rowspan?: ExtendedElementAttr<number>;
    scope?: ExtendedElementAttr<"row" | "col" | "rowgroup" | "colgroup" | "auto">;
    wrap?: ExtendedElementAttr<"hard" | "soft" | "off">;
}
export interface IHtmlTimeElementProps extends IHtmlElementProps<HTMLTimeElement> {
    datetime?: ExtendedElementAttr<string | Date>;
}
export interface IHtmlTitleElementProps extends IHtmlElementProps<HTMLTitleElement> {
}
export interface IHtmlTrElementProps extends IHtmlElementProps<HTMLTableRowElement> {
}
export interface IHtmlTrackElementProps extends IHtmlElementProps<HTMLTrackElement> {
    default?: ExtendedElementAttr<boolean>;
    kind?: ExtendedElementAttr<"subtitles" | "captions" | "descriptions" | "chapters" | "metadata">;
    label?: ExtendedElementAttr<string>;
    src?: ExtendedElementAttr<string>;
    srclang?: ExtendedElementAttr<string>;
}
export interface IHtmlVideoElementProps extends IHtmlElementProps<HTMLVideoElement> {
    autoplay?: ExtendedElementAttr<boolean>;
    buffered?: ExtendedElementAttr<boolean>;
    controls?: ExtendedElementAttr<boolean>;
    crossorigin?: ExtendedElementAttr<CrossoriginPropType>;
    height?: ExtendedElementAttr<number>;
    loop?: ExtendedElementAttr<boolean>;
    muted?: ExtendedElementAttr<boolean>;
    playsinline?: ExtendedElementAttr<boolean>;
    preload?: ExtendedElementAttr<"none" | "metadata" | "auto" | "">;
    intrinsicsize?: ExtendedElementAttr<boolean>;
    poster?: ExtendedElementAttr<string>;
    src?: ExtendedElementAttr<string>;
}
export interface IHtmlUlElementProps extends IHtmlElementProps<HTMLUListElement> {
}
export interface IHtmlIntrinsicElements {
    a: IHtmlAElementProps;
    abbr: IHtmlElementProps;
    address: IHtmlElementProps;
    area: IHtmlAreaElementProps;
    article: IHtmlElementProps;
    aside: IHtmlElementProps;
    audio: IHtmlAudioElementProps;
    b: IHtmlElementProps;
    base: IHtmlBaseElementProps;
    bdi: IHtmlElementProps;
    bdo: IHtmlElementProps;
    blockquote: IHtmlBlockquoteElementProps;
    body: IHtmlElementProps;
    br: IHtmlBrElementProps;
    button: IHtmlButtonElementProps;
    canvas: IHtmlCanvasElementProps;
    caption: IHtmlCaptionElementProps;
    cite: IHtmlElementProps;
    code: IHtmlElementProps;
    col: IHtmlColElementProps;
    colgroup: IHtmlColgroupElementProps;
    data: IHtmlDataElementProps;
    datalist: IHtmlDataListElementProps;
    dd: IHtmlDdElementProps;
    del: IHtmlDelElementProps;
    details: IHtmlDetailsElementProps;
    dfn: IHtmlElementProps;
    dialog: IHtmlDialogElementProps;
    div: IHtmlDivElementProps;
    dl: IHtmlDlElementProps;
    dt: IHtmlElementProps;
    em: IHtmlElementProps;
    embed: IHtmlEmbedElementProps;
    fieldset: IHtmlFieldsetElementProps;
    figcaption: IHtmlElementProps;
    figure: IHtmlElementProps;
    footer: IHtmlElementProps;
    form: IHtmlFormElementProps;
    h1: IHtmlH1ElementProps;
    h2: IHtmlH2ElementProps;
    h3: IHtmlH3ElementProps;
    h4: IHtmlH4ElementProps;
    h5: IHtmlH5ElementProps;
    h6: IHtmlH6ElementProps;
    head: IHtmlHeadElementProps;
    header: IHtmlElementProps;
    hgroup: IHtmlElementProps;
    hr: IHtmlHrElementProps;
    html: IHtmlHtmlElementProps;
    i: IHtmlElementProps;
    iframe: IHtmlIframeElementProps;
    img: IHtmlImgElementProps;
    input: IHtmlInputElementProps;
    ins: IHtmlInsElementProps;
    kbd: IHtmlElementProps;
    keygen: IHtmlElementProps;
    label: IHtmlLabelElementProps;
    legend: IHtmlLegendElementProps;
    li: IHtmlLiElementProps;
    link: IHtmlLinkElementProps;
    listing: IHtmlListingElementProps;
    main: IHtmlElementProps;
    map: IHtmlMapElementProps;
    mark: IHtmlElementProps;
    menu: IHtmlMenuElementProps;
    menuitem: IHtmlElementProps;
    meta: IHtmlMetaElementProps;
    meter: IHtmlMeterElementProps;
    nav: IHtmlElementProps;
    noscript: IHtmlElementProps;
    object: IHtmlObjectElementProps;
    ol: IHtmlOlElementProps;
    optgroup: IHtmlOptgroupElementProps;
    option: IHtmlOptionElementProps;
    output: IHtmlOutputElementProps;
    p: IHtmlPElementProps;
    param: IHtmlParamElementProps;
    picture: IHtmlPictureElementProps;
    pre: IHtmlPreElementProps;
    progress: IHtmlProgressElementProps;
    q: IHtmlQElementProps;
    rp: IHtmlElementProps;
    rt: IHtmlElementProps;
    rtc: IHtmlElementProps;
    ruby: IHtmlElementProps;
    s: IHtmlElementProps;
    samp: IHtmlElementProps;
    script: IHtmlScriptElementProps;
    section: IHtmlElementProps;
    select: IHtmlSelectElementProps;
    slot: IHtmlSlotElementProps;
    small: IHtmlElementProps;
    source: IHtmlSourceElementProps;
    span: IHtmlSpanElementProps;
    strong: IHtmlElementProps;
    style: IHtmlStyleElementProps;
    sub: IHtmlElementProps;
    summary: IHtmlElementProps;
    sup: IHtmlElementProps;
    table: IHtmlTableElementProps;
    tbody: IHtmlTbodyElementProps;
    td: IHtmlTdElementProps;
    template: IHtmlTemplateElementProps;
    textarea: IHtmlTextareaElementProps;
    tfoot: IHtmlTfootElementProps;
    th: IHtmlThElementProps;
    thead: IHtmlTHeadElementProps;
    time: IHtmlTimeElementProps;
    title: IHtmlTitleElementProps;
    tr: IHtmlTrElementProps;
    track: IHtmlTrackElementProps;
    u: IHtmlElementProps;
    ul: IHtmlUlElementProps;
    var: IHtmlElementProps;
    video: IHtmlVideoElementProps;
    wbr: IHtmlElementProps;
}
//# sourceMappingURL=HtmlTypes.d.ts.map