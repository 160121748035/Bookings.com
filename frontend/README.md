# HotelBooker - React Frontend with AWS Cognito

A modern hotel booking application built with React, featuring AWS Cognito authentication and a beautiful, responsive UI.

## Features

- 🔐 **AWS Cognito Authentication** - Secure user authentication and management
- 🏨 **Hotel Search & Discovery** - Browse and search hotels with advanced filters
- 📅 **Room Booking System** - Book rooms with date selection and pricing
- 👤 **User Profile Management** - Complete user account settings and preferences
- 📋 **Booking History** - View and manage your booking history
- 🎨 **Modern UI/UX** - Beautiful, responsive design with Tailwind CSS
- 📱 **Mobile Responsive** - Optimized for all device sizes

## Tech Stack

- **Frontend**: React 18, React Router DOM
- **Authentication**: AWS Amplify, AWS Cognito
- **Styling**: Tailwind CSS, Lucide React Icons
- **Date Handling**: React DatePicker, date-fns
- **Notifications**: React Hot Toast
- **HTTP Client**: Axios

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- AWS Account with Cognito User Pool configured

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure AWS Cognito

1. Create a Cognito User Pool in AWS Console
2. Create a User Pool Client
3. Update the `src/aws-exports.js` file with your configuration:

```javascript
const awsmobile = {
    "aws_project_region": "us-east-1",
    "aws_cognito_region": "us-east-1",
    "aws_user_pools_id": "YOUR_USER_POOL_ID",
    "aws_user_pools_web_client_id": "YOUR_CLIENT_ID",
    // ... other configuration
};
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=your_backend_api_url
REACT_APP_AWS_REGION=us-east-1
```

### 4. Start Development Server

```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Navbar.js       # Navigation component
├── contexts/           # React contexts
│   └── AuthContext.js  # Authentication context
├── pages/              # Page components
│   ├── Home.js         # Homepage
│   ├── Hotels.js       # Hotel listing page
│   ├── HotelDetail.js  # Hotel detail and booking
│   ├── MyBookings.js   # User booking history
│   └── Profile.js      # User profile and settings
├── aws-exports.js      # AWS Amplify configuration
├── App.js              # Main app component
├── index.js            # App entry point
└── index.css           # Global styles
```

## Key Features Explained

### Authentication Flow
- Uses AWS Cognito for secure user authentication
- Automatic session management
- Protected routes for authenticated users
- Sign up, sign in, and sign out functionality

### Hotel Booking System
- Search hotels by name, location, and price range
- View detailed hotel information and amenities
- Select room types and dates
- Real-time pricing calculation
- Booking confirmation with email notifications

### User Profile Management
- Personal information management
- Security settings (password change, 2FA)
- Notification preferences
- Payment method management
- Account preferences (language, currency, timezone)

## API Integration

The frontend is designed to work with a backend API that matches your Prisma schema. Key endpoints needed:

- `GET /api/hotels` - List hotels with filtering
- `GET /api/hotels/:id` - Get hotel details
- `GET /api/hotels/:id/rooms` - Get hotel rooms
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user bookings
- `PUT /api/bookings/:id/cancel` - Cancel booking

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to AWS S3 + CloudFront

1. Build the application
2. Upload the `build` folder to S3
3. Configure CloudFront for CDN
4. Set up custom domain (optional)

## Customization

### Styling
- Modify `tailwind.config.js` for theme customization
- Update `src/index.css` for global styles
- Component-specific styles are in their respective files

### AWS Cognito Configuration
- Update `src/aws-exports.js` with your Cognito settings
- Configure social providers if needed
- Set up custom attributes for user profiles

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Check the AWS Cognito documentation
- Review the React and AWS Amplify documentation

## Next Steps

1. **Backend Integration**: Connect to your Prisma-based backend API
2. **Payment Processing**: Integrate Stripe or PayPal for payments
3. **Email Notifications**: Set up AWS SES for booking confirmations
4. **Analytics**: Add Google Analytics or AWS Pinpoint
5. **Testing**: Add unit and integration tests
6. **CI/CD**: Set up automated deployment pipeline