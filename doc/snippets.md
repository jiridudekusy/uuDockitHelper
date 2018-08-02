# {section} How to use snippets ? 

Snippets are small pieces of code that can be inserted via the completion box. Based on a trigger a piece of code is inserted that can have one or more areas that can be filled by the user using `[TAB]` to switch between them.

The following example shows a snippet that is triggered by typing `section[TAB]`.

<UuContentKit.Bricks.BlockWarning>
  Due to the error the snippet is not displayed correctly, please look into <UU5.Bricks.Strong>Markdown</UU5.Bricks.Strong> source.
</UuContentKit.Bricks.BlockWarning>

<UU5.CodeKit.CodeViewer>
# {section} ${1:header}
${0}

{section}
</UU5.CodeKit.CodeViewer>

It inserts the `section` onstruct and starts by selecting the word *header*. After changing that and pressing [TAB] the cursor moves to the body of the section. 

Snippets can be inserted into the markdown using following ways:
* Write name of snippet into markdown and press `[TAB]`
* Use code completion via `[Ctrl+Space]`
* Use insert component dialog via button *Insert Component* or key shortcut `[Alt+I]`(Windows/Linux) or `[Command+J]`(Mac) 


{section}

