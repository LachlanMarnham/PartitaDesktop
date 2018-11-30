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
            sort_index: int,  # TODO doesn't currently do anything
            last_played: str,
            played_since_shuffle: bool,
            created: Optional[str],  # None if instantiating new item for the first time
    ) -> None:

        self.iid = iid
        self.title = title
        self.sort_index = sort_index
        self.last_played = str_to_datetime(last_played)  # TODO: this is the wrong function...resolution too low
        self.played_since_shuffle = played_since_shuffle
        self.created = datetime.now() if created is None else str_to_datetime(created)


class Piece(BaseMusicalItem):
    item_type = ItemTypes.PIECE

    def __init__(
            self,
            iid: int,
            title: str,
            sort_index: int,  # TODO doesn't currently do anything
            composer: str = '',
            tempo: Optional[int] = None,
            last_played: Optional[str] = None,
            played_since_shuffle: bool = False,
            created: Optional[str] = None,    # None if instantiating new item for the first time, else str from db
    ) -> None:

        self.composer = composer
        self.tempo = tempo
        super().__init__(iid, title, sort_index, last_played, played_since_shuffle, created)

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
    item_type = ItemTypes.SCALE

    def __init__(
            self,
            iid: int,
            title: str,
            sort_index: int,  # TODO doesn't currently do anything
            tempos: Optional[SortedSet] = None,
            last_played=None,
            played_since_shuffle=False,
            created: Optional[str] = None,  # None if instantiating new item for the first time, else str from db
    ) -> None:

        self.tempos = tempos if tempos is not None else SortedSet()
        super().__init__(iid, title, sort_index, last_played, played_since_shuffle, created)

    def add_tempo(self, tempo: int) -> None:
        """ Add a new tempo to the set (it will be automatically re-sorted) """
        self.tempos.add(tempo)
