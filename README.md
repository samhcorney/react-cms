# React CMS

## Roadmap
* Complete rewrite of backend ( all code is currently for testing ). Make sure to remove need for temporaryhack when rewriting theme saving logic
* Add document store db ( couchdb / mongodb )
* Allow for easy creation of custom type ( no modification to core )



* Add list type with option in cms to add remove from list and sort. You should be able to add any content types to a list. Sorting should be smart enough to work out which unique values exist in each of these content types and sort accordingly.



* Make remove work for nested json objects
* Make add work for nested json objects
* Validation on add. Handle must be unique ( at least for that current depth in the JSON tree ).
* Move add content logic into separate component ( need a way of restricting which content types are available... i.e. for theme only colour ). Current array of content types should be set once and used to produce the content imports. i.e. the current switch statement over all content should use this. This also needs to be extensible with custom content through plugins/ custom contentType creation per site.
* Make content sortable/arrangeable through drag and drop on the current list of content items.
* Apple S to save. Enter to save?
* Move content card in content editor into separate component.

* Validate function on all content types

* Discard changes button?
* Rename menu to main navigation or something similar. Menu is too generic.
* Make toast and alerts global components that can be called anywhere... look into flux/redux

* Colour field type to be finished. Something beyond just text input.




* Look into redux/flux. And refactor alerts and toast using this ( if they are a good option for globally reusable components )


* For the new way of storing content data with an array the removeMetadata function needs to be retested to make sure it works with any JSON object.
