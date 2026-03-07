import { literal } from './factory/literal.js';
import { optional } from './factory/optional.js';
import { shape } from './factory/shape.js';
import { isNumber } from './isNumber.js';
import { isString } from './isString.js';

import type { TimeoutError } from '../types/errors.js';

/**
 * Checks if a input is a TimeoutError.
 *
 * @privateRemarks
 * Using `instanceof` is not reliable for cross-realm errors.
 * We must check the shape of the input instead. 🦆
 */
export const isTimeoutError = shape<TimeoutError>({
  name: literal('TimeoutError'),
  message: isString,
  stack: optional(isString),
  code: isNumber,
  INDEX_SIZE_ERR: literal(1),
  DOMSTRING_SIZE_ERR: literal(2),
  HIERARCHY_REQUEST_ERR: literal(3),
  WRONG_DOCUMENT_ERR: literal(4),
  INVALID_CHARACTER_ERR: literal(5),
  NO_DATA_ALLOWED_ERR: literal(6),
  NO_MODIFICATION_ALLOWED_ERR: literal(7),
  NOT_FOUND_ERR: literal(8),
  NOT_SUPPORTED_ERR: literal(9),
  INUSE_ATTRIBUTE_ERR: literal(10),
  INVALID_STATE_ERR: literal(11),
  SYNTAX_ERR: literal(12),
  INVALID_MODIFICATION_ERR: literal(13),
  NAMESPACE_ERR: literal(14),
  INVALID_ACCESS_ERR: literal(15),
  VALIDATION_ERR: literal(16),
  TYPE_MISMATCH_ERR: literal(17),
  SECURITY_ERR: literal(18),
  NETWORK_ERR: literal(19),
  ABORT_ERR: literal(20),
  URL_MISMATCH_ERR: literal(21),
  QUOTA_EXCEEDED_ERR: literal(22),
  TIMEOUT_ERR: literal(23),
  INVALID_NODE_TYPE_ERR: literal(24),
  DATA_CLONE_ERR: literal(25),
});
