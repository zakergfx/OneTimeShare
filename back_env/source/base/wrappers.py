from rest_framework.response import Response

def allowed_user(function):
    def wrapper(*args, **kwargs):
        givenUserId = kwargs["userId"]
        actualUserId = args[0].user.id
        
        if (givenUserId == actualUserId or args[0].user.is_superuser):
            return function(*args, **kwargs)
        else:
            return Response({"detail": "Unauthorized : You are neither admin nor the right user"}, status=401)
    
    return wrapper

def admin_user(function):
    def wrapper(*args, **kwargs):
        
        if (args[0].user.is_superuser):
            return function(*args, **kwargs)
        else:
            return Response({"detail": "Unauthorized : Only admins are allowed here"}, status=401)
    
    return wrapper