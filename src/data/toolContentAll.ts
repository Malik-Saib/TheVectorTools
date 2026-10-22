import { TOOL_CONTENT, ToolContentEntry } from './toolContent';
import { TOOL_CONTENT_A } from './toolContentA';
import { TOOL_CONTENT_B } from './toolContentB';
import { TOOL_CONTENT_C } from './toolContentC';

/**
 * Merged expanded-content lookup for all 31 tools:
 * stage 1 pilots (toolContent) + stage 2 batches A/B/C.
 */
export const TOOL_CONTENT_ALL: Record<string, ToolContentEntry> = {
  ...TOOL_CONTENT,
  ...TOOL_CONTENT_A,
  ...TOOL_CONTENT_B,
  ...TOOL_CONTENT_C,
};
