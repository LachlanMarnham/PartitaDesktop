from enum import Enum, unique


@unique
class ItemTypes(Enum):
    PIECE = 0
    SCALE = 1
    NOTE = 2
