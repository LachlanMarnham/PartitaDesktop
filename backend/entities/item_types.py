from abc import ABCMeta
from datetime import datetime, timedelta
from typing import Optional

from sortedcontainers import SortedSet

from backend.enums import ItemTypes
from backend.helpers import get_highest_reasonable_time_from_timedelta, str_to_datetime


class BaseMusicalItem(metaclass=ABCMeta):

    def __init__(
            self,
            iid: int,
            title: str,
            last_played: str,
            played_since_shuffle: bool,
            item_type: ItemTypes,
    ) -> None:

        self.iid = iid
        self.title = title
        self.last_played = str_to_datetime(last_played)  # TODO: this is the wrong function...resolution too low
        self.played_since_shuffle = played_since_shuffle
        self.item_type = item_type
        self.created = datetime.now()


class Piece(BaseMusicalItem):

    def __init__(
            self,
            iid: int,
            title: str,
            composer: str = '',
            tempo: Optional[int] = None,
            last_played: Optional[str] = None,
            played_since_shuffle: bool = False,
    ) -> None:

        self.composer = composer
        self.tempo = tempo
        super().__init__(iid, title, last_played, played_since_shuffle, item_type=ItemTypes.PIECE)

    @property
    def _dormancy(self) -> Optional[timedelta]:
        if self.last_played:
            return datetime.now() - self.last_played

    @property
    def dormancy_string(self) -> str:
        if not self.last_played:
            return "Never played"
        elapsed, label = get_highest_reasonable_time_from_timedelta(self._dormancy)
        return f"{elapsed} {label.rstrip('s') if elapsed == 1 else label} ago"

    def mark_as_played(self) -> None:
        """
        Should be called when selecting the *next* piece from the list, in case we log out midway through practice
        """
        self.played_since_shuffle = True
        # self.time_since_last played should update here

    def schedule(self) -> None:
        """
        Should be called once all pieces in the list have been played
        :return:
        """
        self.played_since_shuffle = False


class Scale(BaseMusicalItem):

    def __init__(
            self,
            iid: int,
            title: str,
            tempos: Optional[SortedSet] = None,
            last_played=None,
            played_since_shuffle=False,
    ) -> None:

        self.tempos = tempos if tempos is not None else SortedSet()
        super().__init__(iid, title, last_played, played_since_shuffle, item_type=ItemTypes.SCALE)

    def add_tempo(self, tempo: int) -> None:
        """ Add a new tempo to the set (it will be automatically re-sorted) """
        self.tempos.add(tempo)
