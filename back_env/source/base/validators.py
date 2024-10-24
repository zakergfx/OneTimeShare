from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _

class CustomPasswordValidator:
    def validate(self, password, user=None):
        # Vérification de la longueur minimale
        if len(password) < 10:
            raise ValidationError(
                _("Password must have atleast 10 chars"),
                code='password_too_short',
            )

        # Vérification d'au moins un chiffre
        if not any(char.isdigit() for char in password):
            raise ValidationError(
                _("Password must have atleast one number"),
                code='password_no_number',
            )

        # Vérification d'au moins une majuscule
        if not any(char.isupper() for char in password):
            raise ValidationError(
                _("Password must have atleast one uppercase char"),
                code='password_no_upper',
            )

        # Vérification d'au moins une minuscule
        if not any(char.islower() for char in password):
            raise ValidationError(
                _("Password must atleast have one lowercase char"),
                code='password_no_lower',
            )

    def get_help_text(self):
        return _(
            "Password must be 10 chars long, have one number, lowercase char, and uppercase char."
        )
