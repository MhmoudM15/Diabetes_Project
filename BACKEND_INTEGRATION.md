# Backend Integration Guide

## Overview

Your Smart Medical AI System now has a **mock backend API layer** that simulates real backend functionality. This allows you to test the full user flow without connecting to an actual database or server.

## What's Implemented

### 1. **Authentication System**
- **Location**: `/src/contexts/AuthContext.tsx`
- **Features**:
  - Login with email/password
  - Signup for patients and doctors
  - Session persistence using localStorage
  - User role management (patient/doctor)
  - Logout functionality

### 2. **API Service Layer**
- **Location**: `/src/services/api.ts`
- **Mock APIs**:
  - `authAPI` - Authentication (login, signup, logout, getCurrentUser)
  - `glucoseAPI` - Glucose readings management
  - `mealAPI` - Meal logging
  - `patientAPI` - Patient data (for doctors)
  - `alertAPI` - Critical alerts management
  - `aiAPI` - AI predictions and recommendations

### 3. **Custom React Hooks**
- **Location**: `/src/hooks/`
- **Available Hooks**:
  - `useAuth()` - Access authentication state and methods
  - `useGlucoseData(patientId)` - Fetch and manage glucose readings
  - `useMealData(patientId)` - Fetch and manage meal logs
  - `usePatientData(doctorId)` - Fetch patients for doctors
  - `usePatient(patientId)` - Fetch single patient details
  - `useAlerts(patientId?)` - Fetch and manage alerts

## Demo Credentials

### Patient Account
- **Email**: `patient@demo.com`
- **Password**: Any password (mock auth accepts any password)
- **Account Type**: Patient

### Doctor Account
- **Email**: `doctor@demo.com`
- **Password**: Any password (mock auth accepts any password)
- **Account Type**: Doctor

## How It Works

### Current Implementation (Mock Backend)

All data is stored in-memory and resets when you refresh the page. This is perfect for:
- ✅ Testing the UI/UX flow
- ✅ Demonstrating the application
- ✅ Developing new features
- ✅ Prototyping

**Example API Call:**
```typescript
import { glucoseAPI } from '../services/api';

// Add a new glucose reading
const newReading = await glucoseAPI.addReading({
  patientId: '1',
  value: 145,
  timestamp: new Date().toISOString(),
  notes: 'After lunch'
});
```

### Authentication Flow

1. User fills out login/signup form
2. Form submits credentials to `authAPI.login()` or `authAPI.signup()`
3. Mock API simulates network delay (500-800ms)
4. User data is stored in localStorage
5. User is redirected to appropriate dashboard
6. Toast notification shows success/error

**Example Usage:**
```typescript
import { useAuth } from '../../contexts/AuthContext';

function MyComponent() {
  const { user, login, logout, isPatient, isDoctor } = useAuth();

  const handleLogin = async () => {
    try {
      await login('patient@demo.com', 'password');
      // User is now logged in
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      {user ? <p>Welcome {user.fullName}</p> : <button onClick={handleLogin}>Login</button>}
    </div>
  );
}
```

## Connecting to a Real Backend

When you're ready to connect to a real backend, follow these steps:

### Option 1: REST API (Express, Django, FastAPI, etc.)

Replace the mock functions in `/src/services/api.ts` with real HTTP calls:

```typescript
// Before (Mock):
export const authAPI = {
  login: async (email: string, password: string): Promise<User> => {
    await delay(800);
    const user = mockUsers.find(u => u.email === email);
    if (!user) throw new Error('Invalid credentials');
    return user;
  }
};

// After (Real API):
export const authAPI = {
  login: async (email: string, password: string): Promise<User> => {
    const response = await fetch('https://your-api.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) throw new Error('Invalid credentials');
    
    const data = await response.json();
    localStorage.setItem('authToken', data.token);
    return data.user;
  }
};
```

### Option 2: Supabase

If you want to use Supabase (recommended for healthcare apps):

1. Create a Supabase project at https://supabase.com
2. Install Supabase client: `npm install @supabase/supabase-js`
3. Replace the API layer with Supabase calls:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'YOUR_SUPABASE_URL',
  'YOUR_SUPABASE_ANON_KEY'
);

export const authAPI = {
  login: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    return data.user;
  }
};
```

### Option 3: Firebase

```typescript
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

export const authAPI = {
  login: async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  }
};
```

## Database Schema (For Real Backend)

When setting up your real backend, you'll need these tables:

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(20) CHECK (role IN ('patient', 'doctor')),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Patients Table
```sql
CREATE TABLE patients (
  id UUID PRIMARY KEY REFERENCES users(id),
  age INTEGER,
  weight VARCHAR(50),
  height VARCHAR(50),
  diabetes_type VARCHAR(50),
  current_glucose INTEGER,
  risk_level VARCHAR(20)
);
```

### Doctors Table
```sql
CREATE TABLE doctors (
  id UUID PRIMARY KEY REFERENCES users(id),
  license_number VARCHAR(100),
  specialization VARCHAR(100),
  hospital VARCHAR(255)
);
```

### Glucose Readings Table
```sql
CREATE TABLE glucose_readings (
  id UUID PRIMARY KEY,
  patient_id UUID REFERENCES patients(id),
  value INTEGER NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Meal Logs Table
```sql
CREATE TABLE meal_logs (
  id UUID PRIMARY KEY,
  patient_id UUID REFERENCES patients(id),
  name VARCHAR(255),
  calories INTEGER,
  carbs INTEGER,
  protein INTEGER,
  fat INTEGER,
  timestamp TIMESTAMP NOT NULL
);
```

### Alerts Table
```sql
CREATE TABLE alerts (
  id UUID PRIMARY KEY,
  patient_id UUID REFERENCES patients(id),
  type VARCHAR(20) CHECK (type IN ('critical', 'warning', 'info')),
  message TEXT,
  glucose_level INTEGER,
  status VARCHAR(20) CHECK (status IN ('active', 'acknowledged', 'resolved')),
  timestamp TIMESTAMP NOT NULL
);
```

## Security Considerations

⚠️ **Important**: The current implementation is for **demonstration purposes only** and should NOT be used in production for actual patient data.

For a production healthcare application, you must:

1. **HIPAA Compliance**: Use HIPAA-compliant infrastructure
2. **Data Encryption**: Encrypt all patient data at rest and in transit
3. **Authentication**: Implement secure JWT tokens or OAuth
4. **Authorization**: Role-based access control (RBAC)
5. **Audit Logs**: Track all data access and modifications
6. **PHI Protection**: Follow all regulations for Protected Health Information

## Next Steps

1. ✅ Test the current mock implementation
2. ✅ Create your backend API (Express, Django, FastAPI, etc.)
3. ✅ Set up your database (PostgreSQL, MongoDB, etc.)
4. ✅ Replace mock API calls with real HTTP requests
5. ✅ Implement proper authentication (JWT, OAuth)
6. ✅ Add API error handling
7. ✅ Deploy your backend to a cloud provider
8. ✅ Update frontend to point to production API

## Support

If you need help integrating with a real backend:
- Review the code in `/src/services/api.ts` for the expected API structure
- Check the TypeScript types for API request/response formats
- Ensure your backend follows the same data models
- Test authentication flow first, then add other features incrementally

---

**Happy coding!** 🚀
