# React CMS

## Roadmap
* Complete rewrite of backend ( all code is currently for testing ). Make sure to remove need for temporaryhack when rewriting theme saving logic
* Add document store db ( couchdb / mongodb )
* Allow for easy creation of custom type ( no modification to core )



* Add list type with option in cms to add remove from list and sort. You should be able to add any content types to a list. Sorting should be smart enough to work out which unique values exist in each of these content types and sort accordingly.




* Make remove work for nested json objects
* Make add work for nested json objects

* Apple S to save. Enter to save?
* Modal to be refactored. At the moment there are two copies of modal in Modal and AddContentModal.


* Discard changes button?
* Rename menu to main navigation or something similar. Menu is too generic.
* Make toast and alerts global components that can be called anywhere... look into flux/redux

* Colour field type to be finished. Something beyond just text input.


* Look into redux/flux. And refactor alerts and toast using this ( if they are a good option for globally reusable components )


* Sorting toggle.

* Lists... sortable... look into whether contentEditor can be reused for list/main content. At the moment List and contentEditor are very similar...... look into moving add content logic outside of AddContentModal. At the moment there is a check for whether the content type is an array in the Modal. When adding content to list handle and name are not needed. Don't show index in list header. List items currently take up too much space ( header required? )... styling required.
