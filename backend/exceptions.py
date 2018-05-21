class DatabaseError(Exception):
    def __call__(self, message):
        super().__call__(message)