from PyQt5.QtCore import QPoint


# Calculate the position of the top left hand corner of the window. This positioning will centre the window.
def get_window_anchor(app, window_width, window_height):
    screen_geometry = app.desktop().screenGeometry()
    screen_width = screen_geometry.width()
    screen_height = screen_geometry.height()
    centre_x = (screen_width - window_width) // 2
    centre_y = (screen_height - window_height) // 2
    return QPoint(centre_x, centre_y)