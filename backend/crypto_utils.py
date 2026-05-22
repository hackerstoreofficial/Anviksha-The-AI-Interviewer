"""
Cryptography utilities for encrypting/decrypting sensitive data
Uses Fernet symmetric encryption for API keys
"""
import os
import logging
from cryptography.fernet import Fernet
import base64
import hashlib

logger = logging.getLogger(__name__)


class CryptoService:
    """Service for encrypting and decrypting sensitive data"""
    
    def __init__(self):
        """Initialize crypto service with encryption key"""
        # Get encryption key from environment or generate one
        encryption_key = os.environ.get('ENCRYPTION_KEY')
        
        if not encryption_key:
            logger.error("ENCRYPTION_KEY not set in environment. A secure key is required.")
            raise ValueError("ENCRYPTION_KEY environment variable is required for secure encryption.")
            
        # Ensure the key is properly formatted for Fernet (must be 32 url-safe base64-encoded bytes)
        try:
            # Try to decode to see if it's already a valid base64 fernet key
            base64.urlsafe_b64decode(encryption_key.encode() if isinstance(encryption_key, str) else encryption_key)
            if not isinstance(encryption_key, bytes):
                encryption_key = encryption_key.encode()
        except Exception:
            # If it's not valid base64 or wrong length, hash it and encode it properly
            key_material = hashlib.sha256(encryption_key.encode() if isinstance(encryption_key, str) else encryption_key).digest()
            encryption_key = base64.urlsafe_b64encode(key_material)
        else:
            # If it decoded successfully, we still need to make sure it's the right length (32 bytes when decoded)
            decoded = base64.urlsafe_b64decode(encryption_key)
            if len(decoded) != 32:
                key_material = hashlib.sha256(encryption_key).digest()
                encryption_key = base64.urlsafe_b64encode(key_material)
        
        self.cipher = Fernet(encryption_key)
        logger.info("CryptoService initialized")
    
    def encrypt(self, plaintext: str) -> str:
        """
        Encrypt a plaintext string
        
        Args:
            plaintext: String to encrypt
            
        Returns:
            Base64-encoded encrypted string
        """
        try:
            if not plaintext:
                return ""
            
            # Encrypt the plaintext
            encrypted_bytes = self.cipher.encrypt(plaintext.encode())
            
            # Return as base64 string for database storage
            return encrypted_bytes.decode()
            
        except Exception as e:
            logger.error(f"Encryption failed: {e}")
            raise
    
    def decrypt(self, ciphertext: str) -> str:
        """
        Decrypt an encrypted string
        
        Args:
            ciphertext: Base64-encoded encrypted string
            
        Returns:
            Decrypted plaintext string
        """
        try:
            if not ciphertext:
                return ""
            
            # Decrypt the ciphertext
            decrypted_bytes = self.cipher.decrypt(ciphertext.encode())
            
            # Return as string
            return decrypted_bytes.decode()
            
        except Exception as e:
            logger.error(f"Decryption failed: {e}")
            raise


# Singleton instance
_crypto_service = None


def get_crypto_service() -> CryptoService:
    """Get or create singleton crypto service instance"""
    global _crypto_service
    if _crypto_service is None:
        _crypto_service = CryptoService()
    return _crypto_service


# Convenience functions
def encrypt_api_key(api_key: str) -> str:
    """Encrypt an API key"""
    return get_crypto_service().encrypt(api_key)


def decrypt_api_key(encrypted_key: str) -> str:
    """Decrypt an API key"""
    return get_crypto_service().decrypt(encrypted_key)
