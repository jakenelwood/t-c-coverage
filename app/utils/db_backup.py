import os
import shutil
import datetime
import logging
from pathlib import Path
import lancedb
from typing import Optional

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class LanceDBBackup:
    def __init__(self, db_path: str, backup_dir: str = "backups"):
        """
        Initialize LanceDB backup utility.
        
        Args:
            db_path: Path to the LanceDB database
            backup_dir: Directory to store backups
        """
        self.db_path = Path(db_path)
        self.backup_dir = Path(backup_dir)
        self.backup_dir.mkdir(parents=True, exist_ok=True)
        
    def create_backup(self, backup_name: Optional[str] = None) -> str:
        """
        Create a backup of the LanceDB database.
        
        Args:
            backup_name: Optional name for the backup. If not provided, 
                        a timestamp-based name will be generated.
        
        Returns:
            Path to the created backup
        """
        try:
            # Generate backup name if not provided
            if not backup_name:
                timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
                backup_name = f"lancedb_backup_{timestamp}"
            
            backup_path = self.backup_dir / backup_name
            
            # Create backup directory
            backup_path.mkdir(parents=True, exist_ok=True)
            
            # Copy database files
            for item in self.db_path.iterdir():
                if item.is_file():
                    shutil.copy2(item, backup_path / item.name)
                elif item.is_dir():
                    shutil.copytree(item, backup_path / item.name)
            
            logger.info(f"Backup created successfully at {backup_path}")
            return str(backup_path)
            
        except Exception as e:
            logger.error(f"Error creating backup: {str(e)}")
            raise
    
    def restore_backup(self, backup_name: str) -> None:
        """
        Restore a LanceDB database from a backup.
        
        Args:
            backup_name: Name of the backup to restore
        """
        try:
            backup_path = self.backup_dir / backup_name
            
            if not backup_path.exists():
                raise FileNotFoundError(f"Backup {backup_name} not found")
            
            # Create a temporary backup of current database
            temp_backup = self.create_backup(f"temp_backup_before_restore_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}")
            
            try:
                # Clear current database directory
                for item in self.db_path.iterdir():
                    if item.is_file():
                        item.unlink()
                    elif item.is_dir():
                        shutil.rmtree(item)
                
                # Restore from backup
                for item in backup_path.iterdir():
                    if item.is_file():
                        shutil.copy2(item, self.db_path / item.name)
                    elif item.is_dir():
                        shutil.copytree(item, self.db_path / item.name)
                
                logger.info(f"Database restored successfully from {backup_name}")
                
            except Exception as e:
                # Restore from temporary backup if something goes wrong
                logger.error(f"Error during restore: {str(e)}")
                logger.info("Attempting to restore from temporary backup...")
                self.restore_backup(Path(temp_backup).name)
                raise
            
        except Exception as e:
            logger.error(f"Error restoring backup: {str(e)}")
            raise
    
    def list_backups(self) -> list:
        """
        List all available backups.
        
        Returns:
            List of backup names
        """
        try:
            return [d.name for d in self.backup_dir.iterdir() if d.is_dir()]
        except Exception as e:
            logger.error(f"Error listing backups: {str(e)}")
            raise
    
    def delete_backup(self, backup_name: str) -> None:
        """
        Delete a backup.
        
        Args:
            backup_name: Name of the backup to delete
        """
        try:
            backup_path = self.backup_dir / backup_name
            if backup_path.exists():
                shutil.rmtree(backup_path)
                logger.info(f"Backup {backup_name} deleted successfully")
            else:
                raise FileNotFoundError(f"Backup {backup_name} not found")
        except Exception as e:
            logger.error(f"Error deleting backup: {str(e)}")
            raise

# Example usage:
"""
# Initialize backup utility
backup_util = LanceDBBackup("data/lancedb", "data/backups")

# Create a backup
backup_path = backup_util.create_backup()

# List available backups
backups = backup_util.list_backups()

# Restore from a backup
backup_util.restore_backup("lancedb_backup_20240101_120000")

# Delete a backup
backup_util.delete_backup("lancedb_backup_20240101_120000")
""" 