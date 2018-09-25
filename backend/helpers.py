from datetime import timedelta, datetime
from typing import Tuple

intervals = {
    'weeks': 604800,
    'days': 86400,
    'hours': 3600,
    'minutes': 60,
    'seconds': 1,
}

# key, val pairs from intervals sorted in decreasing order of val
descending_intervals = sorted(intervals.items(), key=lambda x: x[1], reverse=True)


def get_highest_reasonable_time_from_timedelta(delta: timedelta) -> Tuple[int, str]:
    days, seconds = delta.days, delta.seconds  # microseconds do not qualify as 'reasonable'
    if days:
        return days, 'days'
    for interval, length_in_seconds in descending_intervals:
        if seconds // length_in_seconds:
            return seconds // length_in_seconds, interval


date_format = '%Y-%m-%d'


def datetime_to_str(date_obj: datetime) -> str:
    return date_obj.strftime(date_format)


def str_to_datetime(date_str: str) -> datetime:
    return datetime.strptime(date_str, date_format)
