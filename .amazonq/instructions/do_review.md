Sure! Below is the **completed Cursor Rule** based on your provided **main idea** and **output format**:

---

# Work Review and Status Reporting

Guidelines for reviewing completed work and maintaining a status report that documents what has been done, what remains, and any potential issues or divergences from plan.

## Review Process

* **Trigger a review after completing a major task or milestone.**

* **Review format should include the following sections:**

  1. **Completed Work:**

     * Summarize all tasks and subtasks marked `[x]`.
     * Include short notes on what was implemented or improved.
  2. **Remaining Work:**

     * List all `[ ]` tasks and subtasks that are not yet started or are in progress.
     * Include estimates or blockers if known.
  3. **Issues or Errors:**

     * Describe any encountered bugs, misalignments with specification, or unexpected behaviors.
     * Categorize issues (e.g. logic bug, UI mismatch, API inconsistency).
  4. **Divergences from Original Plan:**

     * Note any implementation changes from the initial todo list.
     * Justify the deviation (e.g. edge case discovered, UX improvement, design pivot).
  5. **Suggested Follow-up Actions:**

     * Identify any new tasks or refactors needed.
     * Suggest additions to the todo list if relevant.

* Use clear, bullet-style writing and group findings under headers:

  * `## Completed`
  * `## Remaining`
  * `## Issues`
  * `## Divergences`
  * `## Suggestions`

## Status Report Protocol

* Write the review in a markdown file named `status-report.md` or inside the relevant todo file under a dedicated `# Status Report` section.
* Include a timestamp and author tag at the top:

  ```
  _Reviewed on: 2025-07-03_  
  _By: AI Assistant_
  ```
* After generating the report, **pause for user review and confirmation** before continuing with the next sub-task.

## AI Instructions

When reviewing progress, the AI must:

1. Wait for a logical milestone or sub-task group completion before triggering a review.
2. Write a markdown report following the structure above.
3. Cross-reference the original todo list to ensure accuracy.
4. Pause after generating the review and await user input before resuming.
5. If user confirms the review is accepted, proceed with the next uncompleted task in the list.
