from typing import Iterable

import random


class BaseCollection(list):

    def __init__(self, iterable: Iterable = None, next_up_index: int = 0):
        super().__init__(iterable if iterable else [])
        self.next_up_index = next_up_index

    def all_played(self) -> bool:
        """
        Returns true if all items have been played since the collection was last shuffled, else False
        """
        played_gen = (item.played for item in self)
        return all(played_gen)

    def mark_all_items_as_unplayed(self) -> None:
        for item in self:
            item.mark_as_unplayed()

    def reschedule_all(self) -> None:
        self.mark_all_items_as_unplayed()
        self.shuffle()
        self.next_up_index = 0

    def get_next_item(self):
        next_item = self[self.next_up_index]
        self.next_up_index += 1
        return next_item

    @property
    def length(self) -> int:
        return len(self)

    def shuffle(self) -> None:
        """
        Shuffle the collection and update the sort_index of every item in the collection
        """
        random.shuffle(self)
        for index, item in enumerate(self):
            item.set_sort_index(index)


class Scales(BaseCollection):
    pass


class Repertoire(BaseCollection):
    pass
