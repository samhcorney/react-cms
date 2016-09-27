# React CMS

## Roadmap
* Complete rewrite of backend ( all code is currently for testing ). Make sure to remove need for temporaryhack when rewriting theme saving logic
* Add document store db ( couchdb / mongodb )
* Allow for easy creation of custom type ( no modification to core )



* Add list type with option in cms to add remove from list and sort. You should be able to add any content types to a list. Sorting should be smart enough to work out which unique values exist in each of these content types and sort accordingly.





* SVGs
* Make remove work for nested json objects
* Make add work for nested json objects
* Validation on add. Handle must be unigue ( at least for that current depth in the JSON tree ). Name can't be blank.
* Move add content logic into separate component ( need a way of restricting which content types are available... i.e. for theme only colour ). Current array of content types should be set once and used to produce the content imports. i.e. the current switch statement over all content should use this. This also needs to be extensible with custom content through plugins/ custom contentType creation per site.
* Basic 'reset' styles for select type
* Make content sortable/arrangeable through drag and drop on the current list of content items.
* Apple S to save. Enter to save?
* Reusable toast component. To appear on save success/failure.
