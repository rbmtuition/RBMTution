"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown, Search, SearchX, X } from "lucide-react";
import { cn } from "@/lib/utils";

type SearchableSelectTheme = "gold" | "teal";

const themeStyles: Record<
  SearchableSelectTheme,
  {
    hoverBorder: string;
    focus: string;
    error: string;
    panelBorder: string;
    header: string;
    searchFocus: string;
    meta: string;
    active: string;
    hover: string;
    check: string;
    mark: string;
    chip: string;
    box: string;
  }
> = {
  gold: {
    hoverBorder: "hover:border-gold-300",
    focus: "focus:border-gold-500 focus:ring-gold-500/20",
    error:
      "border-red-400 hover:border-red-400 focus:border-red-500 focus:ring-red-500/20",
    panelBorder: "border-gold-100",
    header: "border-gold-100 bg-gold-50/60",
    searchFocus:
      "focus-within:border-gold-500 focus-within:ring-gold-500/20",
    meta: "border-gold-100 bg-gold-50/50 text-gold-700",
    active: "bg-gold-50 text-navy-950",
    hover: "hover:bg-gold-50/60",
    check: "text-gold-600",
    mark: "bg-gold-200/70 text-navy-950",
    chip: "border-gold-200 bg-gold-50 text-navy-900",
    box: "border-gold-500 bg-gold-50",
  },
  teal: {
    hoverBorder: "hover:border-teal-300",
    focus: "focus:border-teal-500 focus:ring-teal-500/20",
    error:
      "border-red-400 hover:border-red-400 focus:border-red-500 focus:ring-red-500/20",
    panelBorder: "border-teal-100",
    header: "border-teal-100 bg-teal-50/60",
    searchFocus:
      "focus-within:border-teal-500 focus-within:ring-teal-500/20",
    meta: "border-teal-100 bg-teal-50/50 text-teal-700",
    active: "bg-teal-50 text-navy-950",
    hover: "hover:bg-teal-50/60",
    check: "text-teal-600",
    mark: "bg-teal-200/70 text-navy-950",
    chip: "border-teal-200 bg-teal-50 text-navy-900",
    box: "border-teal-500 bg-teal-50",
  },
};

function HighlightedText({
  text,
  query,
  markClassName,
}: {
  text: string;
  query: string;
  markClassName: string;
}) {
  const term = query.trim();
  if (!term) return text;

  const index = text.toLowerCase().indexOf(term.toLowerCase());
  if (index === -1) return text;

  return (
    <>
      {text.slice(0, index)}
      <mark className={cn("rounded-sm px-0.5", markClassName)}>
        {text.slice(index, index + term.length)}
      </mark>
      {text.slice(index + term.length)}
    </>
  );
}

type SearchableSelectBaseProps = {
  id: string;
  options: readonly string[];
  placeholder?: string;
  searchLabel?: string;
  disabled?: boolean;
  error?: string;
  describedBy?: string;
  required?: boolean;
  className?: string;
  onBlur?: () => void;
  theme?: SearchableSelectTheme;
};

type SingleSearchableSelectProps = SearchableSelectBaseProps & {
  multiple?: false;
  value: string;
  onChange: (value: string) => void;
};

type MultipleSearchableSelectProps = SearchableSelectBaseProps & {
  multiple: true;
  value: string[];
  onChange: (value: string[]) => void;
};

type SearchableSelectProps =
  | SingleSearchableSelectProps
  | MultipleSearchableSelectProps;

function getSelectedValues(props: SearchableSelectProps) {
  if (props.multiple) return props.value;
  return props.value ? [props.value] : [];
}

export function SearchableSelect(props: SearchableSelectProps) {
  const {
    id,
    options,
    placeholder = "Select an option",
    searchLabel = "Search options",
    disabled = false,
    error,
    describedBy,
    required = false,
    className,
    onBlur,
    theme = "gold",
  } = props;
  const multiple = props.multiple === true;
  const selectedValues = getSelectedValues(props);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [panelPosition, setPanelPosition] = useState<{
    top?: number;
    bottom?: number;
    left: number;
    width: number;
    maxHeight: number;
  } | null>(null);
  const listId = `${id}-listbox`;
  const styles = themeStyles[theme];

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return options;
    return options.filter((option) => option.toLowerCase().includes(term));
  }, [options, query]);

  const safeActiveIndex = Math.min(
    activeIndex,
    Math.max(0, filtered.length - 1),
  );
  const activeOption = filtered[safeActiveIndex];
  const activeId =
    open && activeOption ? `${listId}-option-${safeActiveIndex}` : undefined;
  const countLabel = query.trim()
    ? `${filtered.length} ${filtered.length === 1 ? "match" : "matches"}`
    : `${options.length} ${options.length === 1 ? "option" : "options"}`;
  const triggerLabel =
    selectedValues.length === 0
      ? placeholder
      : selectedValues.length === 1
        ? selectedValues[0]
        : `${selectedValues[0]} +${selectedValues.length - 1} more`;
  const hasValue = selectedValues.length > 0;

  const updatePanelPosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger || window.matchMedia("(max-width: 639px)").matches) {
      return;
    }

    const rect = trigger.getBoundingClientRect();
    const gap = 6;
    const margin = 12;
    const availableBelow = Math.max(
      0,
      window.innerHeight - rect.bottom - gap - margin,
    );
    const availableAbove = Math.max(0, rect.top - gap - margin);
    const openUp = availableBelow < 360 && availableAbove > availableBelow;
    const width = Math.min(rect.width, window.innerWidth - margin * 2);
    const left = Math.max(
      margin,
      Math.min(rect.left, window.innerWidth - width - margin),
    );

    setPanelPosition({
      top: openUp ? undefined : rect.bottom + gap,
      bottom: openUp ? window.innerHeight - rect.top + gap : undefined,
      left,
      width,
      maxHeight: Math.max(
        220,
        Math.min(560, openUp ? availableAbove : availableBelow),
      ),
    });
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    function updateMobile() {
      setIsMobile(media.matches);
    }
    updateMobile();
    media.addEventListener("change", updateMobile);
    return () => media.removeEventListener("change", updateMobile);
  }, []);

  useEffect(() => {
    if (!open) return;
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    if (!open || isMobile) return;
    updatePanelPosition();
    window.addEventListener("resize", updatePanelPosition);
    window.addEventListener("scroll", updatePanelPosition, true);
    return () => {
      window.removeEventListener("resize", updatePanelPosition);
      window.removeEventListener("scroll", updatePanelPosition, true);
    };
  }, [open, isMobile, updatePanelPosition]);

  useEffect(() => {
    if (!open || isMobile) return;
    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (containerRef.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      setOpen(false);
      setQuery("");
      onBlur?.();
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open, isMobile, onBlur]);

  useEffect(() => {
    if (!open || !isMobile) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open, isMobile]);

  useEffect(() => {
    if (!open || !activeId) return;
    document.getElementById(activeId)?.scrollIntoView({ block: "nearest" });
  }, [activeId, open]);

  function isInside(node: Node | null) {
    if (!node) return false;
    return Boolean(
      containerRef.current?.contains(node) || panelRef.current?.contains(node),
    );
  }

  function openMenu() {
    updatePanelPosition();
    setQuery("");
    setActiveIndex(0);
    setOpen(true);
  }

  function close(focusTrigger = true) {
    setOpen(false);
    setQuery("");
    if (focusTrigger) {
      window.requestAnimationFrame(() => triggerRef.current?.focus());
    }
  }

  function cancel() {
    close();
    onBlur?.();
  }

  function select(option: string) {
    if (props.multiple) {
      const next = props.value.includes(option)
        ? props.value.filter((entry) => entry !== option)
        : [...props.value, option];
      props.onChange(next);
      return;
    }
    props.onChange(option);
    close();
  }

  function remove(option: string) {
    if (!props.multiple) return;
    props.onChange(props.value.filter((entry) => entry !== option));
  }

  function clearAll() {
    if (!props.multiple) return;
    props.onChange([]);
    window.requestAnimationFrame(() => inputRef.current?.focus());
  }

  function clearSearch() {
    setQuery("");
    setActiveIndex(0);
    window.requestAnimationFrame(() => inputRef.current?.focus());
  }

  function handleSearchKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const lastIndex = Math.max(0, filtered.length - 1);

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex(Math.min(lastIndex, safeActiveIndex + 1));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(Math.max(0, safeActiveIndex - 1));
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      if (activeOption) select(activeOption);
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      cancel();
      return;
    }
    if (event.key === "Tab") {
      setOpen(false);
      setQuery("");
      onBlur?.();
    }
  }

  function handleBlur(event: React.FocusEvent<HTMLDivElement>) {
    if (isInside(event.relatedTarget as Node | null)) return;
    window.setTimeout(() => {
      if (!isInside(document.activeElement)) {
        onBlur?.();
      }
    }, 0);
  }

  const panel = (
    <div
      ref={panelRef}
      role={isMobile ? "dialog" : undefined}
      aria-modal={isMobile ? true : undefined}
      aria-label={isMobile ? searchLabel : undefined}
      onBlur={handleBlur}
      style={
        !isMobile && panelPosition
          ? {
              top: panelPosition.top,
              bottom: panelPosition.bottom,
              left: panelPosition.left,
              width: panelPosition.width,
              maxHeight: panelPosition.maxHeight,
            }
          : undefined
      }
      className={cn(
        "flex flex-col overflow-hidden border bg-white",
        styles.panelBorder,
        isMobile
          ? "fixed inset-x-0 bottom-0 z-[100] max-h-[80dvh] rounded-t-3xl pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-24px_60px_-20px_rgba(6,21,48,0.4)] animate-sheet-up"
          : "fixed z-[80] max-h-[70vh] rounded-2xl shadow-[0_24px_60px_-20px_rgba(6,21,48,0.35)] animate-pop-in",
      )}
    >
      {isMobile ? (
        <div className="shrink-0 px-4 pt-2.5 pb-2">
          <div className="mx-auto h-1 w-10 rounded-full bg-slate-300" />
          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-[11px] font-extrabold tracking-[0.16em] text-navy-900 uppercase">
              {searchLabel}
            </p>
            {multiple ? (
              <button
                type="button"
                onClick={cancel}
                className="rounded-full bg-navy-900 px-3.5 py-2 text-[11px] font-extrabold text-white transition hover:bg-navy-800 focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Done{selectedValues.length > 0 ? ` (${selectedValues.length})` : ""}
              </button>
            ) : (
              <button
                type="button"
                onClick={cancel}
                aria-label="Close options"
                className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-navy-900 focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      ) : null}

      <div
        className={cn(
          "shrink-0 px-3 pb-3",
          isMobile ? "pt-0" : "p-2",
          styles.header,
        )}
      >
        <div
          className={cn(
            "relative rounded-xl border border-slate-200 bg-white transition focus-within:ring-2",
            styles.searchFocus,
          )}
        >
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={activeId}
            aria-label={searchLabel}
            autoComplete="off"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleSearchKeyDown}
            placeholder="Type to search..."
            className="h-11 w-full rounded-xl border-0 bg-transparent pr-10 pl-10 text-base text-ink placeholder:text-slate-400 focus:ring-0 focus:outline-none sm:text-sm"
          />
          {query ? (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              className="absolute top-1/2 right-2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-navy-900"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </div>
      </div>

      <div
        className={cn(
          "flex shrink-0 items-center justify-between gap-3 border-t px-4 py-2 text-[10px] font-extrabold tracking-[0.08em] uppercase",
          styles.meta,
        )}
      >
        <span>
          {countLabel}
          {multiple && selectedValues.length > 0
            ? ` · ${selectedValues.length} selected`
            : ""}
        </span>
        <span className="flex items-center gap-3">
          {multiple && selectedValues.length > 0 ? (
            <button
              type="button"
              onClick={clearAll}
              className="font-extrabold tracking-normal normal-case underline decoration-current underline-offset-2"
            >
              Clear all
            </button>
          ) : null}
          <span className="hidden font-semibold tracking-normal normal-case sm:inline">
            Arrow keys to move, Enter to select
          </span>
        </span>
        <span className="sr-only" role="status" aria-live="polite">
          {countLabel} available
          {multiple ? `, ${selectedValues.length} selected` : ""}
        </span>
      </div>

      <ul
        id={listId}
        role="listbox"
        aria-label={searchLabel}
        aria-multiselectable={multiple || undefined}
        className="max-h-[min(52dvh,20rem)] overflow-y-auto overscroll-contain p-1.5 sm:max-h-64"
      >
        {filtered.length > 0 ? (
          filtered.map((option, index) => {
            const selected = selectedValues.includes(option);
            const active = index === safeActiveIndex;
            return (
              <li
                key={option}
                id={`${listId}-option-${index}`}
                role="option"
                aria-selected={selected}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => select(option)}
                onMouseEnter={() => setActiveIndex(index)}
                className={cn(
                  "flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-[15px] sm:text-sm",
                  active ? styles.active : cn("text-navy-800", styles.hover),
                  selected && "font-semibold",
                )}
              >
                <span className="truncate">
                  <HighlightedText
                    text={option}
                    query={query}
                    markClassName={styles.mark}
                  />
                </span>
                {multiple ? (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded border",
                      selected ? styles.box : "border-slate-300 bg-white",
                    )}
                  >
                    {selected ? (
                      <Check className={cn("h-3 w-3", styles.check)} />
                    ) : null}
                  </span>
                ) : selected ? (
                  <Check
                    className={cn("h-4 w-4 shrink-0", styles.check)}
                  />
                ) : null}
              </li>
            );
          })
        ) : (
          <li className="px-4 py-9 text-center">
            <SearchX className="mx-auto h-6 w-6 text-slate-300" />
            <p className="mt-2 text-sm font-semibold text-navy-900">
              No matches for “{query.trim()}”
            </p>
            <p className="mt-1 text-xs text-muted">
              Check the spelling or try a shorter search.
            </p>
            <button
              type="button"
              onClick={clearSearch}
              className={cn(
                "mt-3 inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-bold transition",
                styles.panelBorder,
                styles.hoverBorder,
                "text-navy-900",
              )}
            >
              <X className="h-3.5 w-3.5" />
              Clear search
            </button>
          </li>
        )}
      </ul>
    </div>
  );

  return (
    <>
      <div
        ref={containerRef}
        className="relative"
        onBlur={handleBlur}
      >
        <button
          ref={triggerRef}
          id={id}
          type="button"
          disabled={disabled}
          onClick={() => {
            if (disabled) return;
            if (open) {
              close();
            } else {
              openMenu();
            }
          }}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-describedby={describedBy}
          data-required={required || undefined}
          className={cn(
            "flex h-11 w-full items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-left text-sm text-ink transition focus:ring-2 focus:outline-none",
            disabled
              ? "cursor-not-allowed bg-slate-50 text-slate-400 disabled:opacity-100"
              : error
                ? styles.error
                : cn(styles.hoverBorder, styles.focus),
            className,
          )}
        >
          <Search
            className={cn(
              "h-4 w-4 shrink-0",
              disabled ? "text-slate-300" : "text-slate-400",
            )}
          />
          <span className={cn("truncate", !hasValue && "text-slate-400")}>
            {triggerLabel}
          </span>
          <ChevronDown
            className={cn(
              "ml-auto h-4 w-4 shrink-0 text-slate-500 transition",
              open && "rotate-180",
            )}
          />
        </button>

        {multiple && selectedValues.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {selectedValues.map((option) => (
              <span
                key={option}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border py-1 pr-1.5 pl-2.5 text-[11px] font-bold",
                  styles.chip,
                )}
              >
                {option}
                <button
                  type="button"
                  onClick={() => remove(option)}
                  aria-label={`Remove ${option}`}
                  className="flex h-4 w-4 items-center justify-center rounded-full transition hover:bg-white/80"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        ) : null}

      </div>

      {open
        ? createPortal(
            <>
              {isMobile ? (
                <div
                  className="fixed inset-0 z-[90] bg-navy-950/45 backdrop-blur-[2px]"
                  aria-hidden="true"
                  onClick={cancel}
                />
              ) : null}
              {panel}
            </>,
            document.body,
          )
        : null}
    </>
  );
}
