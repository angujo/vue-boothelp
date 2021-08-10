// @ts-ignore
import Vue,{ VNode } from 'vue';

declare class BSelect extends Vue {
    id?:number|string;
    options?:any[];
    value?:any;
    multiple?:boolean;
    trackBy?:string;
    label?:string;
    searchable?:boolean;
    clearOnSelect?:boolean;
    hideSelected?:boolean;
    placeholder?:string;
    allowEmpty?:boolean;
    resetAfter?:boolean;
    closeOnSelect?:boolean;
    customLabel?:Function;
    taggable?:boolean;
    tagPlaceholder?:string;
    tagPosition?:string;
    max?:number;
    optionsLimit?:number;
    groupValues?:string;
    groupLabel?:string;
    groupSelect?:boolean;
    blockKeys?:any[];
    internalSearch?:boolean;
    preserveSearch?:boolean;
    preselectFirst?:boolean;
    name?:string;
    selectLabel?:string;
    selectGroupLabel?:string;
    selectedLabel?:string;
    deselectLabel?:string;
    deselectGroupLabel?:string;
    showLabels?:boolean;
    limit?:number;
    limitText?:Function;
    loading?:boolean;
    disabled?:boolean;
    maxHeight?:number;
    openDirection?:string;
    showNoResults?:boolean;
    tabindex?:number;
    showPointer?:boolean;
    optionHeight?:number;
    tags?: boolean;
    params?: object;
    url?: string;
    modelValue?:any;
    noNotification?:boolean;
    preLoad?:any;
    minChars?:number;

    $emit(eventName: 'change', e: {originalEvent: Event, value: any}): this;
    $emit(eventName: 'select', e: {originalEvent: Event, value: any, option: any}): this;
    $emit(eventName: 'deselect', e: {originalEvent: Event, value: any, option: any}): this;
    $emit(eventName: 'remove', e: {originalEvent: Event, value: any, option: any}): this;
    $emit(eventName: 'search-change', e: {originalEvent: Event, query: string}): this;
    $emit(eventName: 'tag', e: {originalEvent: Event, query: string}): this;
    $emit(eventName: 'open'): this;
    $emit(eventName: 'close'): this;
    $emit(eventName: 'clear'): this;

    $slots: {
        placeholder: VNode[];
        afterlist: VNode[];
        beforelist: VNode[];
        list: VNode[];
        multiplelabel: VNode[];
        singlelabel: VNode[];
        option: VNode[];
        tag: VNode[];
    };
}

export default BSelect;