from random import shuffle


class BaseCollection(list):

    def __init__(self, iterable=None):
        super().__init__(iterable if iterable else [])

    @property
    def length(self):
        return self.__len__()

    def shuffle(self):
        shuffle(self)


class Scales(BaseCollection):
    pass


class Repertoire(BaseCollection):
    pass
