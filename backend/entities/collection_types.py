from random import shuffle


class BaseCollection(list):

    def __init__(self, iterable=None, next_up_index=0):
        super().__init__(iterable if iterable else [])
        self.next_up_index = next_up_index

    def all_played(self):
        """
        Work out if it is time to schedule the items again
        """
        played_gen = (item.played for item in self)
        return all(played_gen)

    def mark_all_items_as_unplayed(self):
        for item in self:
            item.mark_as_unplayed()

    def reschedule_all(self):
        self.mark_all_items_as_unplayed()
        self.shuffle()
        self.next_up_index = 0

    def get_next_item(self):
        next_item = self.__getitem__(self.next_up_index)
        self.next_up_index += 1
        return next_item

    @property
    def length(self):
        return self.__len__()

    def shuffle(self):
        shuffle(self)


class Scales(BaseCollection):
    pass


class Repertoire(BaseCollection):
    pass
