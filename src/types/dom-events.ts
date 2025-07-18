import type { KeysWhere } from './utils.js';

export type AnimationEventName = KeysWhere<DocumentEventMap, AnimationEvent>;
export type ClipboardEventName = KeysWhere<DocumentEventMap, ClipboardEvent>;
export type CompositionEventName = KeysWhere<DocumentEventMap, CompositionEvent>;
export type DragEventName = KeysWhere<DocumentEventMap, DragEvent>;
export type ErrorEventName = KeysWhere<DocumentEventMap, ErrorEvent>;
export type EventName = KeysWhere<DocumentEventMap, Event>;
export type FocusEventName = KeysWhere<DocumentEventMap, FocusEvent>;
export type FormDataEventName = KeysWhere<DocumentEventMap, FormDataEvent>;
export type InputEventName = KeysWhere<DocumentEventMap, InputEvent>;
export type KeyboardEventName = KeysWhere<DocumentEventMap, KeyboardEvent>;
export type MouseEventName = KeysWhere<DocumentEventMap, MouseEvent>;
export type PointerEventName = KeysWhere<DocumentEventMap, PointerEvent>;
export type ProgressEventName = KeysWhere<DocumentEventMap, ProgressEvent>;
export type SecurityPolicyViolationEventName = KeysWhere<DocumentEventMap, SecurityPolicyViolationEvent>;
export type SubmitEventName = KeysWhere<DocumentEventMap, SubmitEvent>;
export type TouchEventName = KeysWhere<DocumentEventMap, TouchEvent>;
export type TransitionEventName = KeysWhere<DocumentEventMap, TransitionEvent>;
export type UIEventName = KeysWhere<DocumentEventMap, UIEvent>;
export type WheelEventName = KeysWhere<DocumentEventMap, WheelEvent>;
