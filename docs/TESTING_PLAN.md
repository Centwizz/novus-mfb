# TESTING PLAN - Novus MFB

## Testing Strategy
Multi-layer testing: unit, integration, E2E, security, accessibility, performance.

## Unit Tests
- Business logic
- Utilities
- Validators
- Components (frontend)
- Services (backend)

## Integration Tests
- API endpoints
- Database operations
- Auth flows
- Support ticketing
- Chatbot logic

## E2E Tests (Playwright)
- Public pages navigation
- Responsive layouts
- Registration/login
- Support ticket creation
- Chatbot interactions
- Admin functions
- Critical user flows

## Security Tests
- Auth bypass attempts
- RBAC enforcement
- IDOR prevention
- XSS/CSRF
- Rate limiting
- File upload validation
- Prompt injection
- Session management

## Accessibility Tests
- WCAG 2.2 AA compliance
- Keyboard navigation
- Screen reader compatibility
- Color contrast
- Focus management
- Form labels/errors

## Performance Tests
- Page load times
- API response times
- Image optimization
- Bundle size
- Database query performance
- Chatbot latency

## Test Coverage Goals
- Critical paths: 100%
- Core business logic: high coverage
- UI components: reasonable coverage

## Continuous Testing
- Run on each phase
- Lint, typecheck, build in CI
- Tests must pass before phase completion
