import sys
from PyQt5.QtCore import QPoint
from PyQt5.QtGui import QIcon
from PyQt5.QtWidgets import QApplication, QWidget

WINDOW_HEIGHT = 600
WINDOW_WIDTH = 971


# Calculate the position of the top left hand corner of the window. This positioning will centre the window.
def get_window_anchor(app):
    screen_geometry = app.desktop().screenGeometry()
    screen_width = screen_geometry.width()
    screen_height = screen_geometry.height()
    centre_x = (screen_width - WINDOW_WIDTH) // 2
    centre_y = (screen_height - WINDOW_HEIGHT) // 2
    return QPoint(centre_x, centre_y)


class HomeScreen(QWidget):
    def __init__(self, app):
        super().__init__()
        self.anchor = get_window_anchor(app)
        self.initialise_UI()

    def initialise_UI(self):
        self.resize(WINDOW_WIDTH, WINDOW_HEIGHT)
        self.move(self.anchor)
        self.setWindowTitle('Partita')
        # TODO test with logo enabled in environment
        self.setWindowIcon(QIcon('logo.svg'))

        self.show()


if __name__ == '__main__':
    partita = QApplication(sys.argv)
    home_screen = HomeScreen(partita)

    sys.exit(partita.exec_())

