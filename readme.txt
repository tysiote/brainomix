Hello Brainomix team,
Thank you for the opportunity to participate in this challenge.

To run this project, please see README.MD file - however, nothing special really is required.
You can change the URL in .env file.


What I did and how I progressed:
I reserved a weekend for this project, actually did this in basically one full day.
I think I accomplished everything that was in the challenge description (and more).
I tried to secure the page from unexpected/nullish patient's properties, also from incorrect fetching JSON.

I used redux here. It's being used for keeping the data (as a storage) both raw and filtered/sorted.
Having it like this is scalable for the future and the data is not being updated by every render.
I assume, you will test this application with hundreds or thousands of items - I tried not to make unnecessary data updates, readings or renderings.
I built a dummy-data-generator (inspired by your dataset) with a given number of patients. I've tested it on thousands without any significant slowdown.
The only problem was, when I tried to render everything (tested on 20K items) - you could really feel the slow rendering process.

Regarding improving performance, I thought about flattening the array of patients, however it already was flat enough.
I also was thinking about using memo or callbacks, however, since I'm not repetitively asking for the same result from functions, it wasn't necessary.
One can argue, that having the same dataset and doing numerous sorting can be memoized, however the search functionality would be a burden here.

Away from data structure, I also used redux for keeping the locale - just to show off, I've implemented the change-language functionality.
It currently recognizes English (en-150) and Slovak, since I'm from Slovakia. It's very easy to add there another language and translations.

I've implemented the required sorting ability (ID, Name, State), and also expanded it with descending/ascending stuff + searchField.
The search field filters the data (only filtered data is rendered or processed/sorted) and it tries to find a match in patient's name or id.

I couldn't really decide, how exactly I wanted to show the data, therefore I've come with two solutions - user can switch between them.
I've implemented a simple table component, that displays the data. Additionally, I've come with the `Card-Grid` system as a table replacement.
The data shown on both solutions are the same. User can click either on table's row or grid's card to see more information about the patient.
The extra information is shown next to the data in a separate card - including the image, URL link and an option to close the card.
If the screen's width isn't enough, the information is shown below.

The problem with a huge amount of data I also tried to solve with Pagination component, that I've completely built from scratch (since I wasn't satisfied with existing solutions).
The pagination works independently of the grid or the table - it's just a dummy component only working with numbers (not data).
It reacts to user's actions and sends back the current indices/indexes to the main page. Those indices are being used to limit the rendered data.

Lastly, I've tried to make this application responsive - even for mobile devices.
Unfortunately, there was no time left to spend for making/writing unit test.
If you are also interested in that, I can write some in "overtime" - I'm used to testing components using Chai/Enzyme/Mocha/Jest.

Thank you again.



