import json
import sys

from PyQt5.QtCore import Qt
from PyQt5.QtWidgets import QApplication, QFrame, QHBoxLayout, QSplitter, QStyleFactory, QWidget

from frontend.helpers import get_window_anchor


class BaseView(QWidget):
    def __init__(self, app, config):
        super().__init__()

        # Initialize and display the user interface
        self.anchor = get_window_anchor(app, config['width'], config['height'])
        self.init_UI(app, config)

    def init_UI(self, app: QApplication, config: dict):

        main_dashboard = self.make_main_dashboard(config['width'], config['height'])
        self.setLayout(main_dashboard)
        QApplication.setStyle(QStyleFactory.create(config['app_style']))

        self.resize(config['width'], config['height'])
        self.move(self.anchor)
        self.setWindowTitle(config['app_title'])
        self.show()

    def make_main_dashboard(self, width: int, height: int) -> QHBoxLayout:
        # Make the right panel, which hosts the metronome and tuner
        top_right = QFrame()
        top_right.setFrameShape(QFrame.StyledPanel)
        bottom_right = QFrame()
        bottom_right.setFrameShape(QFrame.StyledPanel)
        right_side = QSplitter(Qt.Vertical)
        right_side.addWidget(top_right)
        right_side.addWidget(bottom_right)
        right_side.setSizes([height / 2, height / 2])

        # Make the left panel, which hosts the progress tracking functionality
        left_side = QFrame()
        left_side.setFrameShape(QFrame.StyledPanel)

        # Put a splitter between the two sides
        tiles = QSplitter(Qt.Horizontal)
        tiles.addWidget(left_side)
        tiles.addWidget(right_side)
        tiles.setSizes([width / 2, width / 2])

        # Add the windows view to the app
        dashboard = QHBoxLayout(self)
        dashboard.addWidget(tiles)
        return dashboard


if __name__ == '__main__':
    with open('app_config.json') as f:
        APP_CONFIG = json.load(f)

    # Construct the app object
    partita = QApplication(sys.argv)

    # Create the widget
    ex = BaseView(partita, APP_CONFIG)

    # Run until user closes
    sys.exit(partita.exec_())