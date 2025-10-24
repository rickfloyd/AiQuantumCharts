# Simple local JWT authentication helper
import time, jwt
from fastapi import HTTPException, Header

SECRET = "QuantumLocalKey_OnlyForTesting"  # replace with long random string later
ALGO = "HS256"

def create_token(username: str):
    payload = {"sub": username, "exp": int(time.time()) + 3600}
    return jwt.encode(payload, SECRET, algorithm=ALGO)

def verify_token(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing Authorization header")
    try:
        token = authorization.replace("Bearer ", "")
        jwt.decode(token, SECRET, algorithms=[ALGO])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")
