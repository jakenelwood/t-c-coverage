import schedule
import time
import logging
from datetime import datetime, timedelta
from pathlib import Path
from app.utils.db_backup import LanceDBBackup
import os

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('backup.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

class BackupScheduler:
    def __init__(self, db_path: str, backup_dir: str, retention_days: int = 30):
        """
        Initialize backup scheduler.
        
        Args:
            db_path: Path to the LanceDB database
            backup_dir: Directory to store backups
            retention_days: Number of days to keep backups
        """
        self.backup_util = LanceDBBackup(db_path, backup_dir)
        self.retention_days = retention_days
        
    def perform_backup(self):
        """Create a new backup and clean up old backups."""
        try:
            # Create new backup
            backup_path = self.backup_util.create_backup()
            logger.info(f"Daily backup created: {backup_path}")
            
            # Clean up old backups
            self.cleanup_old_backups()
            
        except Exception as e:
            logger.error(f"Error during backup: {str(e)}")
    
    def cleanup_old_backups(self):
        """Remove backups older than retention_days."""
        try:
            backups = self.backup_util.list_backups()
            cutoff_date = datetime.now() - timedelta(days=self.retention_days)
            
            for backup_name in backups:
                # Extract date from backup name (format: lancedb_backup_YYYYMMDD_HHMMSS)
                try:
                    date_str = backup_name.split('_')[2]  # Get YYYYMMDD part
                    backup_date = datetime.strptime(date_str, '%Y%m%d')
                    
                    if backup_date < cutoff_date:
                        self.backup_util.delete_backup(backup_name)
                        logger.info(f"Deleted old backup: {backup_name}")
                except (IndexError, ValueError):
                    logger.warning(f"Could not parse date from backup name: {backup_name}")
                    
        except Exception as e:
            logger.error(f"Error during backup cleanup: {str(e)}")
    
    def start(self):
        """Start the backup scheduler."""
        # Schedule daily backup at 2 AM
        schedule.every().day.at("02:00").do(self.perform_backup)
        
        logger.info("Backup scheduler started")
        logger.info(f"Next backup scheduled for: {schedule.next_run()}")
        
        while True:
            schedule.run_pending()
            time.sleep(60)  # Check every minute

if __name__ == "__main__":
    # Get paths from environment variables or use defaults
    db_path = os.getenv("LANCE_DB_PATH", "data/lancedb")
    backup_dir = os.getenv("BACKUP_DIR", "data/backups")
    retention_days = int(os.getenv("BACKUP_RETENTION_DAYS", "30"))
    
    # Create backup directories if they don't exist
    Path(db_path).mkdir(parents=True, exist_ok=True)
    Path(backup_dir).mkdir(parents=True, exist_ok=True)
    
    # Start the scheduler
    scheduler = BackupScheduler(db_path, backup_dir, retention_days)
    scheduler.start() 