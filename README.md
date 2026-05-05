# Maximus VINYL WRAPS E-Store & Order's Admin Portal

Prototype link: https://maximus-web-client.netlify.app/

A high-performance React application for Maximus vinyl print. This platform allows users to discover products, configure custom printing specifications (including artwork uploads and design services), and request official quotes.

## 🚀 Features

- **State-Driven Multi-View Interface**: A seamless single-page experience navigating through Catalog, Product Details, Checkout, and Confirmation without full page reloads.
- **Dynamic Product Configuration**: Real-time updates for printing materials, quantities, and custom design toggles.
- **Live Artwork Preview**: Instant visual feedback for user-uploaded files using browser-level object URLs.
- **Integrated Quote System**: Multi-part form data submission supporting complex JSON metadata and physical file buffers.
- **Admin Dashboard**: A protected route for staff to manage incoming print jobs and review customer requests.

---

## 🛠 Technical Stack

- **Frontend**: React (Functional Components, Hooks).
- **Styling**: Tailwind CSS for a dark-themed, "industrial" aesthetic.
- **Icons**: Lucide React.
- **Routing**: React Router DOM (v6) with Lazy Loading and Suspense.
- **State Management**: Local React state (`useState`) for cart and configuration persistence.

---

## 🗺 Application Architecture

### Frontend Routes (`App.jsx`)

The application uses `BrowserRouter` for top-level navigation:

| Path           | Component         | Description                                                    |
| :------------- | :---------------- | :------------------------------------------------------------- |
| `/`            | `LandingPage`     | Company overview and entry point.                              |
| `/contact`     | `EStore`          | The main commercial engine and product catalog.                |
| `/admin-login` | `AdminLogin`      | Authentication gateway for the dashboard.                      |
| `/dashboard`   | `MasterDashboard` | **Protected Route**: Administrative view for order management. |

### Internal Views (`EStore.jsx`)

The E-Store component manages its own internal state to switch between sub-views:

- **Catalog**: Displays the `PRODUCTS` array with interactive cards.
- **Details**: Configuration view for a specific `selectedProduct`.
- **Checkout**: Order summary, cart item removal, and contact information form.
- **Confirmation**: Success state displaying the response from the backend.

---

## 🔌 API & Endpoint Documentation

### Submit Print Job (Quote Request)

The application communicates with the backend via the `handleQuoteSubmit` function.

- **URL**: `${VITE_API_URL}/print-jobs`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`

#### Request Body (FormData)

| Key                 | Type        | Description                                                             |
| :------------------ | :---------- | :---------------------------------------------------------------------- |
| `customerName`      | String      | User's full name.                                                       |
| `customerEmail`     | String      | Contact email.                                                          |
| `customerPhone`     | String      | Contact phone number.                                                   |
| `isCustomDesign`    | Boolean     | True if **any** item in the cart requires professional design services. |
| `cartData`          | JSON String | Array of objects containing `qty`, `material`, `size`, and `notes`.     |
| `file_[cartItemId]` | File        | Binary file object for each item that has an uploaded artwork.          |

---

## 🔐 Administrative Access

The Admin view is guarded by a `ProtectedRoute` component.

1.  **Login**: Access `/admin-login` to authenticate.
2.  **Dashboard**: Once authenticated, the user is redirected to `/dashboard` where `MasterDashboard` renders the management interface.

---

## 📦 Local Setup

1.  **Environment Variables**:
    Create a `.env` file in the root directory:

    ```env
    VITE_API_URL=https://your-api-endpoint.com
    ```

2.  **Install Dependencies**:

    ```bash
    npm install
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```

---

## 📝 Order Logic Implementation

- **Cart Item Uniqueness**: Every item added to the cart is assigned a unique `cartItemId` combining a timestamp and a random string. This allows users to add the same product multiple times with different artwork or instructions.
- **Memory Management**: When an item is removed from the cart, the application automatically calls `URL.revokeObjectURL` to free up system memory used by artwork previews.
