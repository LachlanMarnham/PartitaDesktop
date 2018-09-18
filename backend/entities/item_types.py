from datetime import datetime
from typing import Optional

from backend.helpers import get_highest_reasonable_time_from_timedelta


class Piece:

    def __init__(self, name, composer='', tempos=None, last_played=None):
        self.name = name
        self.composer = composer
        self.tempos = tempos
        self.last_played = last_played
        self.created = datetime.now()

    @property
    def _dormancy(self) -> Optional[datetime]:
        if self.last_played:
            return datetime.now() - self.last_played

    @property
    def dormancy_string(self) -> str:
        if not self.last_played:
            return "Never played"
        elapsed, label = get_highest_reasonable_time_from_timedelta(self._dormancy)
        return f"{elapsed} {label.rstrip('s') if elapsed == 1 else label} ago"
