// @ts-ignore
import Vue, {VNode} from 'vue';

declare class DatetimeInput extends Vue {
    range?: boolean;
    calendar?: boolean;
    date?: boolean;
    time?: boolean;
    datetime?: boolean;
    rows?: number;
    columns?: number;
    step?: number;
    titlePosition?: "left" | "center" | "right";
    isExpanded?: boolean;
    navVisibility?: "focus" | "hover" | "visible";
    transition?: "slide-h" | "slide-v" | "fade" | "none";
    fromPage?: object;
    fromDate?: Date;
    toPage?: object;
    toDate?: Date;
    minPage?: object;
    minDate?: Date;
    maxPage?: object;
    maxDate?: Date;
    attributes?: any[];
    disabledDates?: any;
    availableDates?: any;
    masks?: object;
    color?: string;
    isDark?: boolean;
    firstDayOfWeek?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
    locale?: string | object;
    timezone?: string;
    showWeeknumbers?: string | object;
    showIsoWeeknumbers?: string | object;
    disablePageSwipe?: boolean;

    $emit(eventName: 'update:from-page', e: { page: object }): this;
    $emit(eventName: 'update:to-page', e: { page: object }): this;
    $emit(eventName: 'weeknumberclick', e: { page: object }): this;
    $emit(eventName: 'dayclick', e: { page: object }): this;
    $emit(eventName: 'daymouseenter', e: { page: object }): this;
    $emit(eventName: 'daymouseleave', e: { page: object }): this;
    $emit(eventName: 'dayfocusin', e: { page: object }): this;
    $emit(eventName: 'dayfocusout', e: { page: object }): this;
    $emit(eventName: 'transition-start', e: { page: object }): this;
    $emit(eventName: 'transition-end', e: { page: object }): this;

    $slots: {
        "header": VNode[];
        "header-title": VNode[];
        "day-content": VNode[];
        "day-popover": VNode[];
        "header-left-button": VNode[];
        "header-right-button": VNode[];
        "nav-left-button": VNode[];
        "nav-right-button": VNode[];
    };
}

export default DatetimeInput;