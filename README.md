# React CMS

## Roadmap
* Complete rewrite of backend ( all code is currently for testing ). Make sure to remove need for temporaryhack when rewriting theme saving logic
* Add document store db ( couchdb / mongodb )
* Allow for easy creation of custom type ( no modification to core )



* Add list type with option in cms to add remove from list and sort. You should be able to add any content types to a list. Sorting should be smart enough to work out which unique values exist in each of these content types and sort accordingly.




* Make remove work for nested json objects
* Make add work for nested json objects

* Make content sortable/arrangeable through drag and drop on the current list of content items.
* Apple S to save. Enter to save?
* Modal to be refactored. At the moment there are two copies of modal in Modal and AddContentModal.


* Discard changes button?
* Rename menu to main navigation or something similar. Menu is too generic.
* Make toast and alerts global components that can be called anywhere... look into flux/redux

* Colour field type to be finished. Something beyond just text input.




* Look into redux/flux. And refactor alerts and toast using this ( if they are a good option for globally reusable components )


* For the new way of storing content data with an array the removeMetadata function needs to be retested to make sure it works with any JSON object.
