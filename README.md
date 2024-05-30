# Newsreader App

Simple two-page SPA application for news browsing using Guardian API.

#### [Link to technical assignment](./Тестовое%20задание.pdf)

**Functionality:**

- **Main page:**

  - Display news cards.
  - Search for news by keyword.
  - Sort news by relevance and date.
  - Customize the number of displayed news items on the page.
  - Infinite scrolling (loading news when reaching the end of the page).
  - Storing the page state in Redux.
  - Loading data from backend via Redux async thunk.

![Main page](https://i.imgur.com/Euyd2hE.png "Main page")

- **News page:**
  - Display full news text with correct formatting (headings, paragraphs, lists, quotes, images).
  - Display news date, illustration (if available), link to original article and back button.
  - Server Side Rendering.

![News page](https://i.imgur.com/SlnXANs.png "News page")

**Technologies:**

- **Frontend:**
  Next.js, TypeScript, Redux Toolkit, CSS Modules

- **Backend:**
  Guardian API: REST API for news content.

**Layout Requirements:**

- Adaptive layout (up to 320px).

**How it works:**

1.  **Main page:**

    - When the page loads, the app makes a request to the Guardian API using the search, sort, news count and page number parameters stored in the Redux store.
    - The resulting data is stored in the Redux store and displayed as news cards.
    - Scrolling down the page triggers a handler that makes a request for the next chunk of data, if available.
    - The user can interact with UI elements (search, sorting, number of news items) by changing the state of the Redux store, which causes the component to re-render and update the data.

2.  **News page:**
    - When navigating to the news page, Next.js pre-requests server-side news data using the news id from the URL.
    - The resulting data is used to render the page on the server, making it load faster and improving SEO.
    - The page displays the full text of the news, formatted with HTML tags and CSS styles.
