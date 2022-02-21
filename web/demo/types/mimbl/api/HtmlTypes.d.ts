import { CssColor, MediaStatement } from "mimcss";
import { IElementProps, EventPropType, ReferrerPolicyPropType, FormtargetPropType, CrossoriginPropType, FormenctypePropType, FormmethodPropType, ExtendedElementProps } from "./mim";
export declare type AutocapitalizePropType = "off" | "none" | "on" | "sentences" | "words" | "characters";
export declare type DirPropType = "ltr" | "rtl" | "auto";
export declare type InputmodePropType = "none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url";
export declare type ImportancePropType = "auto" | "high" | "low";
export declare type InputTypePropType = "button" | "checkbox" | "color" | "date" | "datetime" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week";
export interface IHtmlElementProps<TRef extends HTMLElement = HTMLElement> extends IElementProps<TRef> {
    accesskey?: string;
    autocapitalize?: AutocapitalizePropType;
    contenteditable?: boolean;
    dir?: DirPropType;
    hidden?: boolean;
    inputmode?: InputmodePropType;
    is?: string;
    itemid?: string;
    itemprop?: string;
    itemref?: string;
    itemscope?: boolean;
    itemtype?: string;
    slot?: string;
    title?: string;
    translate?: boolean | "yes" | "no";
    drag?: EventPropType<DragEvent>;
    dragend?: EventPropType<DragEvent>;
    dragenter?: EventPropType<DragEvent>;
    dragleave?: EventPropType<DragEvent>;
    dragover?: EventPropType<DragEvent>;
    dragstart?: EventPropType<DragEvent>;
    drop?: EventPropType<DragEvent>;
}
export interface IHtmlAElementProps extends IHtmlElementProps<HTMLAnchorElement> {
    download?: string;
    href?: string;
    hreflang?: string;
    ping?: string;
    referrerpolicy?: ReferrerPolicyPropType;
    rel?: string;
    target?: FormtargetPropType;
    type?: string;
}
export interface IHtmlAppletElementProps extends IHtmlElementProps<HTMLElement> {
}
export interface IHtmlAreaElementProps extends IHtmlElementProps<HTMLAreaElement> {
    alt?: string;
    coords?: string | number[];
    download?: string;
    href?: string;
    hreflang?: string;
    ping?: string;
    referrerpolicy?: ReferrerPolicyPropType;
    rel?: string;
    shape?: "rect" | "circle" | "poly" | "default";
    target?: FormtargetPropType;
}
export interface IHtmlAudioElementProps extends IHtmlElementProps<HTMLAudioElement> {
    autoplay?: boolean;
    controls?: boolean;
    crossorigin?: CrossoriginPropType;
    loop?: boolean;
    muted?: boolean;
    preload?: "none" | "metadata" | "auto" | "";
    src?: string;
}
export interface IHtmlBaseElementProps extends IHtmlElementProps<HTMLBaseElement> {
    href?: string;
    target?: FormtargetPropType;
}
export interface IHtmlBlockquoteElementProps extends IHtmlElementProps<HTMLQuoteElement> {
    cite?: string;
}
export interface IHtmlBrElementProps extends IHtmlElementProps<HTMLBRElement> {
}
export interface IHtmlButtonElementProps extends IHtmlElementProps<HTMLButtonElement> {
    autofocus?: boolean;
    disabled?: boolean;
    form?: string;
    formaction?: string;
    formenctype?: FormenctypePropType;
    formmethod?: FormmethodPropType;
    formnovalidate?: boolean;
    formtarget?: FormtargetPropType;
    name?: string;
    type?: InputTypePropType;
    value?: string;
}
export interface IHtmlCanvasElementProps extends IHtmlElementProps<HTMLCanvasElement> {
    height?: number;
    width?: number;
}
export interface IHtmlCaptionElementProps extends IHtmlElementProps<HTMLTableCaptionElement> {
}
export interface IHtmlColElementProps extends IHtmlElementProps<HTMLTableColElement> {
    span?: number;
}
export interface IHtmlColgroupElementProps extends IHtmlElementProps<HTMLTableColElement> {
}
export interface IHtmlDataElementProps extends IHtmlElementProps<HTMLDataElement> {
    value?: string | number | boolean;
}
export interface IHtmlDataListElementProps extends IHtmlElementProps<HTMLDataListElement> {
}
export interface IHtmlDdElementProps extends IHtmlElementProps {
    nowrap?: boolean;
}
export interface IHtmlDelElementProps extends IHtmlElementProps<HTMLModElement> {
    cite?: string;
    datetime?: string | Date;
}
export interface IHtmlDetailsElementProps extends IHtmlElementProps<HTMLDetailsElement> {
    open?: boolean;
    toggle?: EventPropType<Event>;
}
export interface IHtmlDialogElementProps extends IHtmlElementProps<HTMLDialogElement> {
    open?: boolean;
}
export interface IHtmlDivElementProps extends IHtmlElementProps<HTMLDivElement> {
    noWrap?: boolean;
}
export interface IHtmlDirElementProps extends IHtmlElementProps<HTMLDirectoryElement> {
}
export interface IHtmlDlElementProps extends IHtmlElementProps<HTMLDListElement> {
    compact?: boolean;
}
export interface IHtmlEmbedElementProps extends IHtmlElementProps<HTMLEmbedElement> {
    height?: number;
    src?: string;
    type?: string;
    width?: number;
}
export interface IHtmlFieldsetElementProps extends IHtmlElementProps<HTMLFieldSetElement> {
    disabled?: boolean;
    form?: string;
    name?: string;
}
export interface IHtmlFontElementProps extends IHtmlElementProps<HTMLFontElement> {
}
export interface IHtmlFrameElementProps extends IHtmlElementProps<HTMLFrameElement> {
}
export interface IHtmlFramesetElementProps extends IHtmlElementProps<HTMLFrameSetElement> {
}
export interface IHtmlFormElementProps extends IHtmlElementProps<HTMLFormElement> {
    acceptCharset?: string | "UNKNOWN";
    action?: string;
    autocapitalize?: AutocapitalizePropType;
    autocomplete?: boolean;
    enctype?: FormenctypePropType;
    method?: FormmethodPropType;
    name?: string;
    novalidate?: boolean;
    target?: string | FormtargetPropType;
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
    align?: string;
    color?: CssColor;
    noshade?: boolean;
    size?: number;
    width?: number;
}
export interface IHtmlHtmlElementProps extends IHtmlElementProps<HTMLHtmlElement> {
}
export interface IHtmlIframeElementProps extends IHtmlElementProps<HTMLIFrameElement> {
    allow?: string;
    allowfullscreen?: boolean;
    csp?: string;
    height?: number;
    importance?: ImportancePropType;
    name?: string;
    referrerpolicy?: ReferrerPolicyPropType;
    sandbox?: string;
    src?: string | "about:blank";
    srcdoc?: string;
    width?: number;
}
export interface IHtmlImgElementProps extends IHtmlElementProps<HTMLImageElement> {
    alt?: string;
    crossorigin?: CrossoriginPropType;
    decoding?: "auto" | "sync" | "async";
    height?: number;
    importance?: ImportancePropType;
    intrinsicsize?: boolean;
    ismap?: boolean;
    referrerpolicy?: ReferrerPolicyPropType;
    sizes?: string;
    src?: string;
    srcset?: string;
    width?: number;
    usemap?: string;
}
export interface IHtmlInputElementProps extends IHtmlElementProps<HTMLInputElement> {
    autocomplete?: string | boolean;
    autofocus?: boolean;
    disabled?: boolean;
    form?: string;
    list?: string;
    name?: string;
    readonly?: boolean;
    required?: boolean;
    type?: InputTypePropType;
    value?: string;
    checked?: boolean;
    defaultValue?: string;
    defaultCheck?: boolean;
    max?: string | number;
    min?: string | number;
    step?: number | "any";
    multiple?: boolean;
    placeholder?: string;
    maxlength?: number;
    minlength?: string;
    size?: number;
    pattern?: string;
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
export interface IHtmlInsElementProps extends IHtmlElementProps<HTMLModElement> {
    cite?: string;
    datetime?: string | Date;
}
export interface IHtmlLabelElementProps extends IHtmlElementProps<HTMLLabelElement> {
    for?: string;
    form?: string;
}
export interface IHtmlLegendElementProps extends IHtmlElementProps<HTMLLegendElement> {
}
export interface IHtmlLiElementProps extends IHtmlElementProps<HTMLLIElement> {
    value?: number;
    type?: "a" | "A" | "i" | "vsides" | "I" | "1";
}
export interface IHtmlLinkElementProps extends IHtmlElementProps<HTMLLinkElement> {
    as?: string;
    crossorigin?: CrossoriginPropType;
    href?: string;
    hrefLang?: string;
    importance?: ImportancePropType;
    integrity?: string;
    media?: MediaStatement;
    referrerpolicy?: ReferrerPolicyPropType;
    rel?: string;
    sizes?: string;
    type?: string;
    disabled?: boolean;
    methods?: string;
    prefetch?: string;
    target?: string;
}
export interface IHtmlListingElementProps extends IHtmlElementProps<HTMLPreElement> {
}
export interface IHtmlMapElementProps extends IHtmlElementProps<HTMLMapElement> {
    name?: string;
}
export interface IHtmlMenuElementProps extends IHtmlElementProps<HTMLMenuElement> {
}
export interface IHtmlMetaElementProps extends IHtmlElementProps<HTMLMetaElement> {
    charset?: string;
    content?: string;
    httpEquiv?: string;
    name?: string;
}
export interface IHtmlMeterElementProps extends IHtmlElementProps<HTMLMeterElement> {
    form?: string;
    high?: number;
    low?: number;
    min?: number;
    max?: number;
    optimum?: number;
    value?: number;
}
export interface IHtmlObjectElementProps extends IHtmlElementProps<HTMLObjectElement> {
    charset?: string;
    content?: string;
    httpEquiv?: string;
    name?: string;
}
export interface IHtmlOlElementProps extends IHtmlElementProps<HTMLOListElement> {
    reversed?: boolean;
    start?: number;
    type?: "a" | "A" | "i" | "I" | "1";
    name?: string;
}
export interface IHtmlOptgroupElementProps extends IHtmlElementProps<HTMLOptGroupElement> {
    disabled?: boolean;
    label: string;
}
export interface IHtmlOptionElementProps extends IHtmlElementProps<HTMLOptionElement> {
    disabled?: boolean;
    label?: string;
    selected?: boolean;
    value?: string;
}
export interface IHtmlOutputElementProps extends IHtmlElementProps<HTMLOutputElement> {
    forInputs?: string;
    form?: string;
    name?: string;
}
export interface IHtmlPElementProps extends IHtmlElementProps<HTMLParagraphElement> {
}
export interface IHtmlParamElementProps extends IHtmlElementProps<HTMLParamElement> {
    name?: string;
    value?: string;
}
export interface IHtmlPictureElementProps extends IHtmlElementProps<HTMLPictureElement> {
}
export interface IHtmlPreElementProps extends IHtmlElementProps<HTMLPreElement> {
}
export interface IHtmlProgressElementProps extends IHtmlElementProps<HTMLProgressElement> {
    max?: number;
    value?: number;
}
export interface IHtmlQElementProps extends IHtmlElementProps<HTMLQuoteElement> {
    cite?: string;
}
export interface IHtmlScriptElementProps extends IHtmlElementProps<HTMLScriptElement> {
    async?: boolean;
    crossorigin?: CrossoriginPropType;
    defer?: boolean;
    integrity?: string;
    nomodule?: boolean;
    nonce?: string;
    src?: string;
    text?: string;
    type?: string;
}
export interface IHtmlSelectElementProps extends IHtmlElementProps<HTMLSelectElement> {
    autocomplete?: string;
    autofocus?: boolean;
    disabled?: boolean;
    form?: string;
    multiple?: boolean;
    name?: string;
    required?: boolean;
    size?: number;
}
export interface IHtmlSlotElementProps extends IHtmlElementProps<HTMLSlotElement> {
}
export interface IHtmlSourceElementProps extends IHtmlElementProps<HTMLSourceElement> {
    media?: MediaStatement;
    sizes?: string;
    src?: string;
    srcset?: string;
    type?: string;
}
export interface IHtmlSpanElementProps extends IHtmlElementProps<HTMLSpanElement> {
}
export interface IHtmlStyleElementProps extends IHtmlElementProps<HTMLStyleElement> {
    media?: MediaStatement;
    nonce?: string;
    title?: string;
    type?: string;
}
export interface IHtmlTableElementProps extends IHtmlElementProps<HTMLTableElement> {
    data?: string;
    form?: string;
    hight?: number;
    name?: string;
    type?: string;
    typemustmatch?: boolean;
    usemap?: string;
    width?: number;
}
export interface IHtmlTbodyElementProps extends IHtmlElementProps<HTMLTableSectionElement> {
}
export interface IHtmlTdElementProps extends IHtmlElementProps<HTMLTableDataCellElement> {
    colspan?: number;
    headers?: string;
    rowspan?: number;
    width?: number;
}
export interface IHtmlTemplateElementProps extends IHtmlElementProps<HTMLTemplateElement> {
}
export interface IHtmlTextareaElementProps extends IHtmlElementProps<HTMLTextAreaElement> {
    autocapitalize?: AutocapitalizePropType;
    autocomplete?: string;
    autofocus?: boolean;
    cols?: number;
    disabled?: boolean;
    form?: string;
    maxlength?: number;
    minlength?: number;
    name?: string;
    placeholder?: string;
    readonly?: boolean;
    required?: boolean;
    rows?: number;
    spellcheck?: "true" | "default" | "false";
    wrap?: "hard" | "soft" | "off";
}
export interface IHtmlTfootElementProps extends IHtmlElementProps<HTMLTableSectionElement> {
}
export interface IHtmlTHeadElementProps extends IHtmlElementProps<HTMLTableSectionElement> {
}
export interface IHtmlThElementProps extends IHtmlElementProps<HTMLTableHeaderCellElement> {
    abbr?: string;
    colspan?: number;
    headers?: string;
    rowspan?: number;
    scope?: "row" | "col" | "rowgroup" | "colgroup" | "auto";
    wrap?: "hard" | "soft" | "off";
}
export interface IHtmlTimeElementProps extends IHtmlElementProps<HTMLTimeElement> {
    datetime?: string | Date;
}
export interface IHtmlTitleElementProps extends IHtmlElementProps<HTMLTitleElement> {
}
export interface IHtmlTrElementProps extends IHtmlElementProps<HTMLTableRowElement> {
}
export interface IHtmlTrackElementProps extends IHtmlElementProps<HTMLTrackElement> {
    default?: boolean;
    kind?: "subtitles" | "captions" | "descriptions" | "chapters" | "metadata";
    label?: string;
    src?: string;
    srclang?: string;
}
export interface IHtmlVideoElementProps extends IHtmlElementProps<HTMLVideoElement> {
    autoplay?: boolean;
    buffered?: boolean;
    controls?: boolean;
    crossorigin?: CrossoriginPropType;
    height?: number;
    loop?: boolean;
    muted?: boolean;
    playsinline?: boolean;
    preload?: "none" | "metadata" | "auto" | "";
    intrinsicsize?: boolean;
    poster?: string;
    src?: string;
}
export interface IHtmlUlElementProps extends IHtmlElementProps<HTMLUListElement> {
}
export interface IHtmlXmpElementProps extends IHtmlElementProps<HTMLPreElement> {
}
export interface IHtmlIntrinsicElements {
    a: ExtendedElementProps<IHtmlAElementProps>;
    abbr: ExtendedElementProps<IHtmlElementProps>;
    acronym: ExtendedElementProps<IHtmlElementProps>;
    address: ExtendedElementProps<IHtmlElementProps>;
    applet: ExtendedElementProps<IHtmlAppletElementProps>;
    area: ExtendedElementProps<IHtmlAreaElementProps>;
    article: ExtendedElementProps<IHtmlElementProps>;
    aside: ExtendedElementProps<IHtmlElementProps>;
    audio: ExtendedElementProps<IHtmlAudioElementProps>;
    b: ExtendedElementProps<IHtmlElementProps>;
    base: ExtendedElementProps<IHtmlBaseElementProps>;
    bdi: ExtendedElementProps<IHtmlElementProps>;
    bdo: ExtendedElementProps<IHtmlElementProps>;
    big: ExtendedElementProps<IHtmlElementProps>;
    blockquote: ExtendedElementProps<IHtmlBlockquoteElementProps>;
    body: ExtendedElementProps<IHtmlElementProps>;
    br: ExtendedElementProps<IHtmlBrElementProps>;
    button: ExtendedElementProps<IHtmlButtonElementProps>;
    canvas: ExtendedElementProps<IHtmlCanvasElementProps>;
    caption: ExtendedElementProps<IHtmlCaptionElementProps>;
    center: ExtendedElementProps<IHtmlElementProps>;
    cite: ExtendedElementProps<IHtmlElementProps>;
    code: ExtendedElementProps<IHtmlElementProps>;
    col: ExtendedElementProps<IHtmlColElementProps>;
    colgroup: ExtendedElementProps<IHtmlColgroupElementProps>;
    data: ExtendedElementProps<IHtmlDataElementProps>;
    datalist: ExtendedElementProps<IHtmlDataListElementProps>;
    dd: ExtendedElementProps<IHtmlDdElementProps>;
    del: ExtendedElementProps<IHtmlDelElementProps>;
    details: ExtendedElementProps<IHtmlDetailsElementProps>;
    dfn: ExtendedElementProps<IHtmlElementProps>;
    dialog: ExtendedElementProps<IHtmlDialogElementProps>;
    dir: ExtendedElementProps<IHtmlDirElementProps>;
    div: ExtendedElementProps<IHtmlDivElementProps>;
    dl: ExtendedElementProps<IHtmlDlElementProps>;
    dt: ExtendedElementProps<IHtmlElementProps>;
    em: ExtendedElementProps<IHtmlElementProps>;
    embed: ExtendedElementProps<IHtmlEmbedElementProps>;
    fieldset: ExtendedElementProps<IHtmlFieldsetElementProps>;
    figcaption: ExtendedElementProps<IHtmlElementProps>;
    figure: ExtendedElementProps<IHtmlElementProps>;
    font: ExtendedElementProps<IHtmlFontElementProps>;
    footer: ExtendedElementProps<IHtmlElementProps>;
    form: ExtendedElementProps<IHtmlFormElementProps>;
    frame: ExtendedElementProps<IHtmlFrameElementProps>;
    frameset: ExtendedElementProps<IHtmlFramesetElementProps>;
    h1: ExtendedElementProps<IHtmlH1ElementProps>;
    h2: ExtendedElementProps<IHtmlH2ElementProps>;
    h3: ExtendedElementProps<IHtmlH3ElementProps>;
    h4: ExtendedElementProps<IHtmlH4ElementProps>;
    h5: ExtendedElementProps<IHtmlH5ElementProps>;
    h6: ExtendedElementProps<IHtmlH6ElementProps>;
    head: ExtendedElementProps<IHtmlHeadElementProps>;
    header: ExtendedElementProps<IHtmlElementProps>;
    hgroup: ExtendedElementProps<IHtmlElementProps>;
    hr: ExtendedElementProps<IHtmlHrElementProps>;
    html: ExtendedElementProps<IHtmlHtmlElementProps>;
    i: ExtendedElementProps<IHtmlElementProps>;
    iframe: ExtendedElementProps<IHtmlIframeElementProps>;
    img: ExtendedElementProps<IHtmlImgElementProps>;
    input: ExtendedElementProps<IHtmlInputElementProps>;
    ins: ExtendedElementProps<IHtmlInsElementProps>;
    kbd: ExtendedElementProps<IHtmlElementProps>;
    keygen: ExtendedElementProps<IHtmlElementProps>;
    label: ExtendedElementProps<IHtmlLabelElementProps>;
    legend: ExtendedElementProps<IHtmlLegendElementProps>;
    li: ExtendedElementProps<IHtmlLiElementProps>;
    link: ExtendedElementProps<IHtmlLinkElementProps>;
    listing: ExtendedElementProps<IHtmlListingElementProps>;
    main: ExtendedElementProps<IHtmlElementProps>;
    map: ExtendedElementProps<IHtmlMapElementProps>;
    mark: ExtendedElementProps<IHtmlElementProps>;
    menu: ExtendedElementProps<IHtmlMenuElementProps>;
    menuitem: ExtendedElementProps<IHtmlElementProps>;
    meta: ExtendedElementProps<IHtmlMetaElementProps>;
    meter: ExtendedElementProps<IHtmlMeterElementProps>;
    nav: ExtendedElementProps<IHtmlElementProps>;
    nobr: ExtendedElementProps<IHtmlElementProps>;
    noframes: ExtendedElementProps<IHtmlElementProps>;
    noscript: ExtendedElementProps<IHtmlElementProps>;
    object: ExtendedElementProps<IHtmlObjectElementProps>;
    ol: ExtendedElementProps<IHtmlOlElementProps>;
    optgroup: ExtendedElementProps<IHtmlOptgroupElementProps>;
    option: ExtendedElementProps<IHtmlOptionElementProps>;
    output: ExtendedElementProps<IHtmlOutputElementProps>;
    p: ExtendedElementProps<IHtmlPElementProps>;
    param: ExtendedElementProps<IHtmlParamElementProps>;
    picture: ExtendedElementProps<IHtmlPictureElementProps>;
    pre: ExtendedElementProps<IHtmlPreElementProps>;
    progress: ExtendedElementProps<IHtmlProgressElementProps>;
    q: ExtendedElementProps<IHtmlQElementProps>;
    rb: ExtendedElementProps<IHtmlElementProps>;
    rp: ExtendedElementProps<IHtmlElementProps>;
    rt: ExtendedElementProps<IHtmlElementProps>;
    rtc: ExtendedElementProps<IHtmlElementProps>;
    ruby: ExtendedElementProps<IHtmlElementProps>;
    s: ExtendedElementProps<IHtmlElementProps>;
    samp: ExtendedElementProps<IHtmlElementProps>;
    script: ExtendedElementProps<IHtmlScriptElementProps>;
    section: ExtendedElementProps<IHtmlElementProps>;
    select: ExtendedElementProps<IHtmlSelectElementProps>;
    slot: ExtendedElementProps<IHtmlSlotElementProps>;
    small: ExtendedElementProps<IHtmlElementProps>;
    source: ExtendedElementProps<IHtmlSourceElementProps>;
    span: ExtendedElementProps<IHtmlSpanElementProps>;
    strike: ExtendedElementProps<IHtmlElementProps>;
    strong: ExtendedElementProps<IHtmlElementProps>;
    style: ExtendedElementProps<IHtmlStyleElementProps>;
    sub: ExtendedElementProps<IHtmlElementProps>;
    summary: ExtendedElementProps<IHtmlElementProps>;
    sup: ExtendedElementProps<IHtmlElementProps>;
    table: ExtendedElementProps<IHtmlTableElementProps>;
    tbody: ExtendedElementProps<IHtmlTbodyElementProps>;
    td: ExtendedElementProps<IHtmlTdElementProps>;
    template: ExtendedElementProps<IHtmlTemplateElementProps>;
    textarea: ExtendedElementProps<IHtmlTextareaElementProps>;
    tfoot: ExtendedElementProps<IHtmlTfootElementProps>;
    th: ExtendedElementProps<IHtmlThElementProps>;
    thead: ExtendedElementProps<IHtmlTHeadElementProps>;
    time: ExtendedElementProps<IHtmlTimeElementProps>;
    title: ExtendedElementProps<IHtmlTitleElementProps>;
    tr: ExtendedElementProps<IHtmlTrElementProps>;
    track: ExtendedElementProps<IHtmlTrackElementProps>;
    tt: ExtendedElementProps<IHtmlElementProps>;
    u: ExtendedElementProps<IHtmlElementProps>;
    ul: ExtendedElementProps<IHtmlUlElementProps>;
    var: ExtendedElementProps<IHtmlElementProps>;
    video: ExtendedElementProps<IHtmlVideoElementProps>;
    wbr: ExtendedElementProps<IHtmlElementProps>;
    xmp: ExtendedElementProps<IHtmlXmpElementProps>;
}
//# sourceMappingURL=HtmlTypes.d.ts.map