import random, time, string, smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def generateRandomString(length):
    chars = string.ascii_letters + string.digits  # Lettres minuscules, majuscules, chiffres
    result = ''.join(random.choice(chars) for _ in range(length))
    return result

def generateTimeStamp(days):
    # On récupère le timestamp actuel
    currentTimestamp = int(time.time())
    # Ajoute 3 jours (3 jours * 24 heures * 3600 secondes par heure)
    days_in_seconds = days * 24 * 60 * 60
    return currentTimestamp + days_in_seconds

def sendMail(to, subject, body):
    # Configuration de l'email
    sender = "service.zakergfx@gmail.com"
   
    # Création du message
    message = MIMEMultipart()
    message["From"] = sender
    message["To"] = to
    message["Subject"] = subject

    # Attacher le corps du texte au message
    message.attach(MIMEText(body, "plain"))

    # Configuration du serveur SMTP
    serveur = smtplib.SMTP("smtp.gmail.com", 587)
    serveur.starttls()  # Sécurisation de la connexion
    serveur.login(sender, "ygpf xybe ktrj uyoh")

    # Envoi de l'email
    try:
        serveur.sendmail(sender, to, message.as_string())
        serveur.quit()
        return True
        
    except:
        serveur.quit()
        return False