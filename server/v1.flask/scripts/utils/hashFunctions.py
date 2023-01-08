import hashlib
import hmac
import base64
import json
import binascii


def generateJWTHeader():
  kwargs = {
    'header': {
      'alg': 'SHA256',
      'typ': 'JWT'
    }
  }
  return kwargs

def base64ToString(string):
  decodedBytes = base64.b64decode(string)
  decodedStr = str(decodedBytes, "utf-8")
  return decodedStr

def stringToBase64(string):
  return base64.b64encode(str(string).encode("utf-8", "strict")).decode("utf-8")

def generateHash(string, key):
  signature = hmac.new(
      binascii.unhexlify(key),
      string.encode(),
      hashlib.sha256,
    ).hexdigest()
  return signature


# TODO: See pbkdf2_sha256 or Argon2
# def generateSecureHash(string, key):
#   timeout = 500_000
#   signature = hashlib.pbkdf2_hmac(
#     'sha256',
#     string.encode,
#     b'bad salt'*2, # No way to set key?
#     timeout)
#   return signature

def generateJWT(header, payload, key, expires=None):
  jwtEncoded = f'{stringToBase64(json.dumps(header))}.{stringToBase64(json.dumps(payload))}'
  signature = generateHash(jwtEncoded, key)
  # if expires != None:
  #   expires = str(int((datetime.datetime.now() + datetime.timedelta(minutes = 1)).timestamp() * 1000 ))
  # issuedAtRaw = datetime.datetime.now()
  # issuedAt = str(int(issuedAtRaw.timestamp() * 1000 ))
  jwt = f'{jwtEncoded}.{stringToBase64(signature)}'
  return jwt

def pbkdf2(password, salt, iterations=1000, keylen=32):
  # Calculate the PBKDF2 function using the SHA-256 hash function
  derived_key = hashlib.pbkdf2_hmac("sha256", password, salt, iterations, keylen)

  # Return the derived key
  return derived_key
