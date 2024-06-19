import hmac
from hashlib import sha256


def verify_webhook(secret_key, data, signature):
    """
    Verifies the authenticity of a webhook using the provided secret key, data, and signature.

    Args:
        secret_key (bytes): The webhook secret key.
        data (bytes): The request body data.
        signature (str): The X-Hub-Signature header value.

    Returns:
        bool: True if the signature is valid, False otherwise.
    """

    if not isinstance(secret_key, bytes):
        raise TypeError("secret_key must be bytes")
    if not isinstance(data, bytes):
        raise TypeError("data must be bytes")
    if not isinstance(signature, str):
        raise TypeError("signature must be a string")

    # Generate the expected signature using HMAC-SHA256
    hasher = hmac.new(secret_key, data, sha256)
    expected_signature = hasher.hexdigest()

    # Compare the received and expected signatures (prepend "sha256=" for matching)
    return hmac.compare_digest(signature, f"sha256={expected_signature}")


# Example usage (replace with your actual values)
secret_key = b"whsec_a6a1711027a86170ef3047db00b0cc9fc784a38892432b157767a1e52a384d79"
data = b"This is some webhook data"
signature = "sha256=b94f7f0c..."  # Replace with the actual signature from the X-Hub-Signature header

if verify_webhook(secret_key, data, signature):
    print("Webhook signature is valid. Process the data.")
else:
    print("Webhook signature is invalid. Reject the request.")
