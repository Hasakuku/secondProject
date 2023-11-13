class CustomError extends Error {
   constructor(code, message) {
       super(message);
       this.code = code;
   }
}

class NotFoundError extends Error {
   constructor(message = 'Not found') {
       super(message);
       this.name = 'NotFoundError';
       this.status = 404;
   }
}

class BadRequestError extends Error {
   constructor(message = 'Bad request') {
       super(message);
       this.name = 'BadRequestError';
       this.status = 400;
   }
}

class UnauthorizedError extends Error {
   constructor(message = 'Unauthorized') {
       super(message);
       this.name = 'UnauthorizedError';
       this.status = 401;
   }
}

class ForbiddenError extends Error {
   constructor(message = 'Forbidden') {
       super(message);
       this.name = 'ForbiddenError';
       this.status = 403;
   }
}

class InternalServerError extends Error {
   constructor(message = 'Internal server error') {
       super(message);
       this.name = 'InternalServerError';
       this.status = 500;
   }
}

class ValidationError extends Error {
   constructor(message = 'Validation failed') {
       super(message);
       this.name = 'ValidationError';
       this.status = 422;
   }
}

class DatabaseError extends Error {
   constructor(message = 'Database error') {
       super(message);
       this.name = 'DatabaseError';
       this.status = 500;
   }
}

class NotModifiedError extends Error {
   constructor(message = 'NotModified error') {
       super(message);
       this.name = 'NotModifiedError';
       this.status = 304;
   }
}

module.exports = { NotModifiedError, DatabaseError, ValidationError, InternalServerError, ForbiddenError, UnauthorizedError, BadRequestError, NotFoundError, CustomError }