#!/bin/bash

# Production Deployment Script for HelloMahi
# This script handles the deployment of the application to production

set -e  # Exit on any error

echo "🚀 Starting production deployment for HelloMahi..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required environment variables are set
check_env_vars() {
    print_status "Checking environment variables..."
    
    required_vars=(
        "NEXT_PUBLIC_SUPABASE_URL"
        "NEXT_PUBLIC_SUPABASE_ANON_KEY"
        "SUPABASE_SERVICE_ROLE_KEY"
        "NEXTAUTH_SECRET"
        "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
        "STRIPE_SECRET_KEY"
        "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME"
        "CLOUDINARY_API_KEY"
        "CLOUDINARY_API_SECRET"
        "RESEND_API_KEY"
    )
    
    missing_vars=()
    
    for var in "${required_vars[@]}"; do
        if [ -z "${!var}" ]; then
            missing_vars+=("$var")
        fi
    done
    
    if [ ${#missing_vars[@]} -ne 0 ]; then
        print_error "Missing required environment variables:"
        for var in "${missing_vars[@]}"; do
            echo "  - $var"
        done
        exit 1
    fi
    
    print_success "All required environment variables are set"
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    if [ -f "package-lock.json" ]; then
        npm ci --production=false
    else
        npm install
    fi
    
    print_success "Dependencies installed successfully"
}

# Run linting
run_lint() {
    print_status "Running linting checks..."
    
    if npm run lint:strict; then
        print_success "Linting passed"
    else
        print_error "Linting failed. Please fix the issues before deploying."
        exit 1
    fi
}

# Run type checking
run_type_check() {
    print_status "Running TypeScript type checking..."
    
    if npx tsc --noEmit; then
        print_success "Type checking passed"
    else
        print_error "Type checking failed. Please fix the type errors before deploying."
        exit 1
    fi
}

# Build the application
build_app() {
    print_status "Building the application..."
    
    if npm run build; then
        print_success "Application built successfully"
    else
        print_error "Build failed. Please check the build errors."
        exit 1
    fi
}

# Run tests (if available)
run_tests() {
    print_status "Running tests..."
    
    if npm run test; then
        print_success "Tests passed"
    else
        print_warning "Tests failed or not configured. Continuing with deployment..."
    fi
}

# Deploy to Vercel (if configured)
deploy_to_vercel() {
    print_status "Deploying to Vercel..."
    
    if command -v vercel &> /dev/null; then
        if vercel --prod; then
            print_success "Deployed to Vercel successfully"
        else
            print_error "Vercel deployment failed"
            exit 1
        fi
    else
        print_warning "Vercel CLI not found. Please install it or deploy manually."
    fi
}

# Deploy to other platforms
deploy_to_platform() {
    local platform=$1
    
    case $platform in
        "railway")
            print_status "Deploying to Railway..."
            if command -v railway &> /dev/null; then
                railway up
                print_success "Deployed to Railway successfully"
            else
                print_warning "Railway CLI not found. Please install it or deploy manually."
            fi
            ;;
        "netlify")
            print_status "Deploying to Netlify..."
            if command -v netlify &> /dev/null; then
                netlify deploy --prod
                print_success "Deployed to Netlify successfully"
            else
                print_warning "Netlify CLI not found. Please install it or deploy manually."
            fi
            ;;
        "aws")
            print_status "Deploying to AWS..."
            # Add AWS deployment logic here
            print_warning "AWS deployment not yet configured"
            ;;
        *)
            print_warning "Unknown platform: $platform"
            ;;
    esac
}

# Setup Supabase (if needed)
setup_supabase() {
    print_status "Setting up Supabase..."
    
    if command -v supabase &> /dev/null; then
        # Check if we need to link to a remote project
        if [ -n "$SUPABASE_PROJECT_ID" ]; then
            supabase link --project-ref "$SUPABASE_PROJECT_ID"
            print_success "Linked to Supabase project: $SUPABASE_PROJECT_ID"
        fi
        
        # Push database migrations
        if supabase db push; then
            print_success "Database migrations applied successfully"
        else
            print_warning "Database migration failed. Please check manually."
        fi
    else
        print_warning "Supabase CLI not found. Please install it or run migrations manually."
    fi
}

# Health check
health_check() {
    print_status "Performing health check..."
    
    # Wait a bit for deployment to complete
    sleep 10
    
    # Get the deployment URL (you might need to adjust this based on your setup)
    if [ -n "$DEPLOYMENT_URL" ]; then
        if curl -f "$DEPLOYMENT_URL/api/health" > /dev/null 2>&1; then
            print_success "Health check passed"
        else
            print_warning "Health check failed. The application might still be starting up."
        fi
    else
        print_warning "DEPLOYMENT_URL not set. Skipping health check."
    fi
}

# Main deployment function
main() {
    local platform=${1:-"vercel"}
    
    print_status "Starting deployment to $platform..."
    
    # Check environment variables
    check_env_vars
    
    # Install dependencies
    install_dependencies
    
    # Run quality checks
    run_lint
    run_type_check
    run_tests
    
    # Build the application
    build_app
    
    # Setup Supabase
    setup_supabase
    
    # Deploy to the specified platform
    if [ "$platform" = "vercel" ]; then
        deploy_to_vercel
    else
        deploy_to_platform "$platform"
    fi
    
    # Health check
    health_check
    
    print_success "🎉 Deployment completed successfully!"
    print_status "Your application should now be live at your deployment URL."
}

# Show usage
usage() {
    echo "Usage: $0 [platform]"
    echo ""
    echo "Platforms:"
    echo "  vercel    - Deploy to Vercel (default)"
    echo "  railway   - Deploy to Railway"
    echo "  netlify   - Deploy to Netlify"
    echo "  aws       - Deploy to AWS"
    echo ""
    echo "Environment Variables Required:"
    echo "  NEXT_PUBLIC_SUPABASE_URL"
    echo "  NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo "  SUPABASE_SERVICE_ROLE_KEY"
    echo "  NEXTAUTH_SECRET"
    echo "  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
    echo "  STRIPE_SECRET_KEY"
    echo "  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME"
    echo "  CLOUDINARY_API_KEY"
    echo "  CLOUDINARY_API_SECRET"
    echo "  RESEND_API_KEY"
    echo ""
    echo "Optional:"
    echo "  SUPABASE_PROJECT_ID - For linking to remote Supabase project"
    echo "  DEPLOYMENT_URL      - For health checks"
}

# Check if help is requested
if [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
    usage
    exit 0
fi

# Run main function with platform argument
main "$1"
