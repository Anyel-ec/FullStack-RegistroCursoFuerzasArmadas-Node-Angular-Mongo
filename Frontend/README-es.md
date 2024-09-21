# Angular Frontend for Registration and Verification System

## Description

This project is a frontend built with Angular that interacts with a backend API for user registration, data verification, document uploads, and handling login and authentication. It communicates with the backend services to perform CRUD operations and manage documents and user data.

## Table of Contents

- [Technologies](#technologies)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Services](#services)
- [Components](#components)
- [Usage](#usage)
- [Author](#author)

## Technologies

- **Angular**: Frontend framework for building single-page applications (SPA).
- **RxJS**: Library for reactive programming using observables.
- **PrimeNG**: UI component library for Angular.
- **Bootstrap**: CSS framework for responsive design.
- **Angular Forms**: For handling reactive forms.
- **reCAPTCHA**: For bot protection during user registration.
- **Ngx-Translate**: For internationalization and localization.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Anyel-ec/FullStack-ProcesoRegistroCursoFuerzasArmadas-NodeJS-Angular18-MongoDB
    ```

2. Navigate to the project directory:

    ```bash
    cd FullStack-ProcesoRegistroCursoFuerzasArmadas-NodeJS-Angular18-MongoDB
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Run the project locally:

    ```bash
    ng serve
    ```

    The project will be running at `http://localhost:4200`.

## Project Structure

```
├── src
│   ├── app
│   │   ├── components        # Reusable UI components
│   │   ├── errors            # Error handling components
│   │   ├── services          # Angular services for API calls
│   │   ├── shared            # Shared components, models, and utilities
│   │   ├── views             # Main views and pages of the app
│   │   ├── app.component.ts  # Root component for the app
│   │   ├── app.module.ts     # Main app module
│   │   ├── app.routes.ts     # App routing module
│   │   ├── app.config.ts     # Configuration files for app settings
│   ├── assets                # Static assets like images and fonts
│   ├── environments          # Environment configuration for development and production
├── .angular.json             # Angular CLI configuration
├── package.json              # Dependencies and project metadata
├── README.md                 # Project documentation
```

## Services

### LoadDataService

This service is responsible for loading data related to provinces, gender, and command types.

```typescript
@Injectable({
  providedIn: 'root'
})
export class LoadDataService {
  private baseUrl = 'http://localhost:3001/api/load';

  constructor(private http: HttpClient) {}

  getProvinces(): Observable<any> {
    return this.http.get(`${this.baseUrl}/province`);
  }

  getGender(): Observable<any> {
    return this.http.get(`${this.baseUrl}/gender`);
  }

  getCommandType(): Observable<any> {
    return this.http.get(`${this.baseUrl}/command`);
  }
}
```

### LoginService

Manages user authentication with the backend.

```typescript
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3001/api'; 

  loginUser(credentials: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/users/login`, credentials, { headers });
  }
}
```

### VerifyDataService

Manages the verification of data.

```typescript
@Injectable({
  providedIn: 'root'
})
export class VerifyDataService {
  private url: string;

  constructor(private http: HttpClient, private apiConfig: ApiConfigService) {
    this.url = this.apiConfig.getBaseUrl() + 'api/verifyData';
  }

  getRelationsVerifyData(): Observable<any> {
    return this.http.get(this.url);
  }

  deleteVerifyData(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  updateVerifyData(id: string, updatedData: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, updatedData);
  }
}
```

### RegisterService

Handles registration-related operations.

```typescript
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private baseUrl = 'http://localhost:3001/api/registers';

  getRegisters(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getRegisterById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createOrUpdateRegister(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }
}
```

## Components

### Header Component

The header component, `<app-header>`, is used to display the navigation bar.

### Card Image Component

The `<app-card-image>` component displays a card-style image.

### Form Components

The form components handle the registration and data input from the user, validating inputs like **identification number**, **email**, **phone number**, and more.

### Table Component

The table component displays data such as registration information, grades, and verification status.

## Usage

To use the application, follow these steps:

1. **Register a User**: Fill out the registration form on the registration page, including details like **identification number**, **phone number**, **email**, and **province**.

2. **Verify Data**: Admins can verify the user data through the verification page, updating the verification status.

3. **Upload Documents**: Upload documents in formats like PDF or image for user verification.

4. **Manage Users**: Admins can accept or reject user registration, view the documents, and manage other user details.
