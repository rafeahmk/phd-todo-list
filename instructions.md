### Fetch and Display User Data with Input and Loading State 👤

#### Task:

Write a small React application that fetches and displays user data from an API when the user enters a user ID in an input field and submits the form. The component should also show a loading indicator while the data is being fetched using `useEffect`.

#### Instructions:

1. **Create a `UserData` Component:**

   - Create a component named `UserData`.
   - Use `useState` to manage the user ID input and the fetched user data.
   - Create an input field where the user can enter a user ID.
   - When the user submits the form, use the `useEffect` hook to fetch user data from an API (e.g., https://jsonplaceholder.typicode.com/users/{id}).
   - Store the fetched data in a state variable using `useState`.
   - Use another `useState` variable to manage a loading state (e.g., `isLoading`).
   - Display a loading indicator (e.g., "Loading...") while the data is being fetched.
   - Once the data is fetched, display the user's name, email, and address in the component.
   - **File to Create:** `UserData.js`

2. **App Component:**
   - Render the `UserData` component in the `App` component.
   - **File to Create:** `App.js`

#### Expected Interactions:

1. **Input Field:**

   - The user enters a user ID in the input field and submits the form.

2. **On Form Submission:**
   - **Loading State:** The component shows a loading indicator while fetching the user data.
   - **Data Fetching:** `useEffect` triggers an API call to fetch user data based on the entered user ID.
   - **Display:** Once the data is fetched, the loading indicator is removed, and the user's name, email, and address are displayed in the component.
