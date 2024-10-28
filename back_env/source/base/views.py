from rest_framework.response import Response
from rest_framework.decorators import api_view
from . import serializers, models, tools, tasks
from django.shortcuts import get_object_or_404

# gérer les secrets
@api_view(["POST"])
def manageSecrets(request):
    data = request.data
    data["uri"] = tools.generateRandomString(20)
    data["expirationdate"] = tools.generateTimeStamp(data["expirationdate"])

    serializer = serializers.SecretSerializer(data=data)

    if (serializer.is_valid()):
        serializer.save()
        jsonData = serializer.data     
        return Response(jsonData, status=201)            
    else:
        return Response({"detail": "Bad request : Missing information in payload"}, status=400)


# gérer un secret
@api_view(["GET", "DELETE"])
def getSecretDetails(request, secretUri):
    # GET
    if request.method == "GET":

        step = request.GET["step"]
        if step == "1":
            data = get_object_or_404(models.Secret, uri=secretUri)
            jsonData = serializers.SecretSerializer(data).data
            del jsonData["content"]
            return Response(jsonData, status=200)

        elif step == "2":
            data = get_object_or_404(models.Secret, uri=secretUri)
            jsonData = serializers.SecretSerializer(data).data
            jsonData["content"] = data.getContent()
            if jsonData["isonce"]:
                data.delete()

            return Response(jsonData, status=200)
        
        else:
            return Response({"detail": "Bad request : Missing or wrong information in payload"}, status=400)        

    # DELETE
    elif request.method == "DELETE":
        data = get_object_or_404(models.Secret, uri=secretUri)
        data.delete()
        return Response(status=204)
        

        

@api_view(["POST"])
def sendMail(request):
    data = request.data

    to = "zakergfx@gmail.com"
    content = data["content"]

    isSent = tools.sendMail(to, "New Message", content)

    if isSent:
        return Response({"content": content}, status=201)
    else:
        return Response({"detail": "Not sent"}, status=404)


@api_view(["GET"])
def testing(request):
    
    data = models.Secret.objects.all()[0]
    data = data.get_content()
    return Response({"response": data}, status=200)    