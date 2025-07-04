# Work Review and Status Reporting

Guidelines for reviewing completed work and maintaining a status report that documents what has been done, what remains, and any potential issues or divergences from plan.

## Review Process

* **Trigger a review after completing a major task or milestone.**

* **Each review report must include the following sections:**

  1. **Completed Work:**

     * Summarize all tasks and subtasks marked `[x]`.
     * Add brief notes on what was accomplished and how.
  2. **Remaining Work:**

     * List all `[ ]` tasks and subtasks still in progress or pending.
     * Add clarifications, blockers, or time estimates if known.
  3. **Issues or Errors:**

     * Document any bugs, incorrect behavior, or misalignment with the spec.
     * Categorize issues (e.g., logic bug, design issue, unclear requirement).
  4. **Divergences from Original Plan:**

     * Describe any changes from the initial plan or todo list.
     * Explain why the changes were made (e.g., tech constraints, better UX).
  5. **Suggested Follow-up Actions:**

     * List new tasks to be added to the todo list.
     * Recommend any needed refactors or improvements.

* Use these markdown headers in your report:

  ```
  ## Completed  
  ## Remaining  
  ## Issues  
  ## Divergences  
  ## Suggestions
  ```

## Status Report File Format

* Reports must be saved in the `/tasks/[ticket-id]/` directory.

* File name format: `[ticket-id]-status-report.md`
  **Example:** `T123-status-report.md`

* At the top of each file, include:

  ```
  _Reviewed on: YYYY-MM-DD_  
  _By: AI Assistant_
  ```

* Do **not** overwrite existing reports for the same ticket. Instead, create a new version if needed (e.g., `T123-status-report-v2.md`).

## AI Instructions

When performing reviews, the AI must:

1. Wait until a milestone or logical task group is completed before generating a report.
2. Follow the structure above and write the status report in `/tasks/[ticket-id]/[ticket-id]/[ticket-id]-status-report.md`.
3. Verify all task completion statuses directly from the todo list.
4. Pause after writing the report to await user review and confirmation.
5. Only proceed with the next task after the user approves the report.


